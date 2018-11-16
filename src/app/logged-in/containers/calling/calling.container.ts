import { OverlayRef } from '@angular/cdk/overlay';
import {
  Component,
  Inject,
  InjectionToken,
  OnDestroy,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { Subscription, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

import { State } from 'src/app/logged-in/store/reducers';
import {
  AcceptCall,
  ReceivedCall,
  WebRTCActionTypes,
  InCallStarted,
  InCallEnded,
  SendWebRTC,
  ReceivedWebRTC,
} from '../../store/actions/webrtc.actions';

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');

const pcConfig = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};

const offerOptions: RTCOfferOptions = {
  offerToReceiveAudio: true,
};

@Component({
  templateUrl: './calling.container.html',
  styleUrls: ['./calling.container.scss'],
})
export class CallingContainer implements OnDestroy, OnInit {
  private actionsubs$: Subscription;
  private actionsubs2$: Subscription;
  private tertiary$: Subscription;
  private timeout$: Subscription;

  private isChannelReady = false;
  private isInitiator = false;
  private isStarted = false;
  private localStream: MediaStream;
  private remoteStream: MediaStream;
  private pc: RTCPeerConnection;

  public receiving = false;
  public calling = false;

  public callAccepted = false;

  public with: string;
  public withID: string;

  @ViewChild('audio')
  private audio: ElementRef<HTMLAudioElement>;

  private ringingAudio: HTMLAudioElement;

  constructor(
    private actions$: Actions,
    private overlayRef: OverlayRef,
    private store: Store<State>,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  private startRinging(src: string) {
    this.ringingAudio = new Audio(src);
    this.ringingAudio.loop = true;
    this.ringingAudio.play();
  }
  private stopRinging() {
    if (this.ringingAudio != null) this.ringingAudio.pause();
    this.ringingAudio = null;
  }

  ngOnInit() {
    this.store.dispatch(new InCallStarted());
    this.receiving = this.data.type === 'receive';
    this.calling = this.data.type === 'begin';
    if (this.calling) {
      this.isInitiator = true;
      this.with = this.data.with;
      this.gotStream(this.data.stream);
      this.timeout$ = timer(30000).subscribe(() => this.onEnd());
    } else if (this.receiving) {
      this.with = this.data.from;
      this.withID = this.data.fromID;

      this.startRinging('/assets/ringtone.mp3');
    }

    this.actionsubs$ = this.actions$
      .pipe(
        ofType<ReceivedCall>(WebRTCActionTypes.ReceivedCall),
        tap(action => {
          if (this.calling && !this.callAccepted) {
            this.isChannelReady = true;
            this.callAccepted = true;
            if (this.timeout$ != null) {
              this.timeout$.unsubscribe();
              this.timeout$ = null;
            }
            this.maybeStart();
            this.withID = action.payload.fromID;
          }
          if (this.receiving) {
            this.onEnd();
          }
        })
      )
      .subscribe();
    this.actionsubs2$ = this.actions$
      .pipe(
        ofType<ReceivedWebRTC>(WebRTCActionTypes.ReceivedWebRTC),
        tap(action => {
          if (this.withID === action.payload.fromID) {
            this.handleMessage(action.payload.body);
          }
        })
      )
      .subscribe();
  }

  handleMessage(message) {
    console.log('Client received message:', message);
    switch (message.type) {
      case 'got-user-media':
        this.maybeStart();
        break;
      case 'offer':
        if (!this.isInitiator && !this.isStarted) {
          this.maybeStart();
        }
        this.pc.setRemoteDescription(new RTCSessionDescription(message));
        this.doAnswer();
        break;
      case 'answer':
        if (this.isStarted) {
          this.pc.setRemoteDescription(new RTCSessionDescription(message));
        }
        break;
      case 'candidate':
        if (this.isStarted) {
          const candidate = new RTCIceCandidate({
            sdpMLineIndex: message.label,
            candidate: message.candidate,
          });
          this.pc.addIceCandidate(candidate);
        }
        break;
      case 'bye':
        if (this.isStarted) {
          this.handleRemoteHangup();
        }
    }
  }

  ngOnDestroy() {
    if (this.actionsubs$) {
      this.actionsubs$.unsubscribe();
    }
    if (this.actionsubs2$) {
      this.actionsubs2$.unsubscribe();
    }
    if (this.timeout$ != null) {
      this.timeout$.unsubscribe();
    }

    this.store.dispatch(new InCallEnded());
  }

  onAccept() {
    this.isChannelReady = true;
    this.callAccepted = true;
    this.stopRinging();
    this.getMedia();
  }

  onEnd() {
    this.stopRinging();
    if (this.localStream)
      this.localStream.getTracks().forEach(track => track.stop());
    this.overlayRef.dispose();
  }

  private getMedia() {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then(
        stream => {
          this.gotStream(stream);
          this.maybeStart();
          this.store.dispatch(new AcceptCall(this.withID));
        },
        err => {
          alert('getUserMedia() error: ' + err.name);
        }
      );
  }

  private gotStream(stream: MediaStream) {
    this.localStream = stream;
  }

  private sendMessage(msg: any) {
    console.log('Sending message', msg);
    this.store.dispatch(new SendWebRTC(msg, this.withID));
  }

  private maybeStart() {
    if (
      !this.isStarted &&
      typeof this.localStream !== 'undefined' &&
      this.isChannelReady
    ) {
      this.createPeerConnection();
      (<any>this.pc).addStream(this.localStream);
      this.isStarted = true;
      if (this.isInitiator) {
        console.log('Creating offer');
        this.doCall();
      }
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.sendMessage({ type: 'bye' });
    this.stop();
  }

  private createPeerConnection() {
    try {
      const pc = new RTCPeerConnection(pcConfig);
      pc.onicecandidate = ev => this.handleIceCandidate(ev);
      (<any>pc).onaddstream = ev => this.handleRemoteStreamAdded(ev);
      (<any>pc).onremovestream = ev => this.handleRemoteStreamRemoved(ev);
      this.pc = pc;
      console.log('Created RTCPeerConnnection');
    } catch (e) {
      console.log('Failed to create PeerConnection, exception: ' + e.message);
      alert('Cannot create RTCPeerConnection object.');
      return;
    }
  }

  handleIceCandidate(event: RTCPeerConnectionIceEvent) {
    console.log('icecandidate event: ', event);
    if (event.candidate) {
      this.sendMessage({
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate,
      });
    } else {
      console.log('End of candidates.');
    }
  }

  handleRemoteStreamAdded(event) {
    console.log('Received Remote stream');
    this.remoteStream = event.stream;
    // Set audio
    this.audio.nativeElement.srcObject = event.stream;
    this.audio.nativeElement.play();
  }

  handleRemoteStreamRemoved(event) {
    console.log('Remote stream removed. Event: ', event);
  }

  private doCall() {
    console.log('Creating offer');
    this.pc
      .createOffer(offerOptions)
      .then()
      .then(desc => this.setLocalAndSend(desc))
      .catch(err => this.onCreateSessionDescriptionError(err));
  }

  private doAnswer() {
    console.log('Sending answer to peer.');
    this.pc
      .createAnswer()
      .then(
        desc => this.setLocalAndSend(desc),
        err => this.onCreateSessionDescriptionError(err)
      );
  }

  private setLocalAndSend(
    desc: RTCSessionDescription | RTCSessionDescriptionInit
  ) {
    console.log('offer/answer created. Sending message');
    this.pc.setLocalDescription(desc);
    this.sendMessage(desc);
  }

  private onCreateSessionDescriptionError(error) {
    console.log('Error occurred while creating session');
    console.trace('Failed to create session description: ' + error.toString());
  }

  private hangup() {
    console.log('Hanging up.');
    if (this.isStarted) {
      this.sendMessage({ type: 'bye' });
      this.stop();
    } else {
      this.onEnd();
    }
  }

  private handleRemoteHangup() {
    console.log('Session terminated.');
    this.stop();
    this.isInitiator = false;
  }

  private stop() {
    this.isStarted = false;
    this.pc.close();
    this.pc = null;
    this.onEnd();
  }
}
