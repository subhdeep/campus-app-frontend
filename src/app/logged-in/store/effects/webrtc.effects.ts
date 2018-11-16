import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import {
  map,
  tap,
  withLatestFrom,
  switchMap,
  catchError,
} from 'rxjs/operators';

import { State } from '../reducers';
import { CallingOverlayService, WebsocketService } from '../../services';
import {
  BeginCall,
  WebRTCActionTypes,
  ReceivingCall,
  AcceptCall,
  SendWebRTC,
  CancelCall,
} from '../actions/webrtc.actions';
import { MessageTypes } from 'src/app/models/websockets';
import { selectInCall } from '../selectors/call.selector';
import { from, of } from 'rxjs';

@Injectable()
export class WebRTCEffects {
  @Effect({ dispatch: false })
  acceptCall$ = this.actions$.pipe(
    ofType<AcceptCall>(WebRTCActionTypes.AcceptCall),
    map(action => action.payload),
    tap(fromID => {
      return this.websocketService.send({
        type: MessageTypes.WebRTCAck,
        message: {
          toID: fromID,
        },
      });
    })
  );

  @Effect({ dispatch: false })
  beginCall$ = this.actions$.pipe(
    ofType<BeginCall>(WebRTCActionTypes.BeginCall),
    map(action => action.username),
    switchMap(username => {
      return from(
        navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        })
      ).pipe(
        tap(stream => {
          this.calling.open({
            type: 'begin',
            with: username,
            stream: stream,
          });
        }),
        tap(() => {
          return this.websocketService.send({
            type: MessageTypes.WebRTCInit,
            message: {
              to: username,
            },
          });
        }),
        catchError(e => {
          alert('getUserMedia() error: ' + e.name);
          return of(e);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  receiveCall$ = this.actions$.pipe(
    ofType<ReceivingCall>(WebRTCActionTypes.ReceivingCall),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectInCall))),
    tap(([payload, inCall]) => {
      if (!inCall) {
        this.calling.open({
          type: 'receive',
          from: payload.from,
          fromID: payload.fromID,
        });
      } else {
        this.websocketService.send({
          type: MessageTypes.WebRTCBusy,
          message: {
            toID: payload.fromID,
          },
        });
      }
    })
  );

  @Effect({ dispatch: false })
  sendWebRTC$ = this.actions$.pipe(
    ofType<SendWebRTC>(WebRTCActionTypes.SendWebRTC),
    tap(action => {
      return this.websocketService.send({
        type: MessageTypes.WebRTC,
        message: {
          toID: action.toID,
          body: action.payload,
        },
      });
    })
  );

  @Effect({ dispatch: false })
  cancelWebRTC$ = this.actions$.pipe(
    ofType<CancelCall>(WebRTCActionTypes.CancelCall),
    tap(action => {
      return this.websocketService.send({
        type: MessageTypes.WebRTCCancel,
        message: {
          to: action.username,
        },
      });
    })
  );

  constructor(
    private actions$: Actions,
    private calling: CallingOverlayService,
    private store: Store<State>,
    private websocketService: WebsocketService
  ) {}
}
