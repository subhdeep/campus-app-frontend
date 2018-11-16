import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { map, tap, exhaustMap, mergeMap, withLatestFrom } from 'rxjs/operators';

import { WebsocketService } from '../../services';
import {
  BeginConnection,
  WebsocketActionTypes,
  MessageReceived,
  ChatMessageReceived,
  ChatMessageSend,
  ChatAckReceived,
} from '../actions/websocket.actions';
import { State } from '../../../auth/store/reducers';
import { MessageTypes, ChatMessage } from 'src/app/models/websockets';
import { getUserId } from 'src/app/auth/store';
import {
  ReceivedCall,
  ReceivingCall,
  ReceivedWebRTC,
} from '../actions/webrtc.actions';
import {
  WebRTCAckMessage,
  WebRTCInitMessage,
  WebRTCMessage,
} from 'src/app/models/webrtc';

@Injectable()
export class WebsocketEffects {
  @Effect({ dispatch: false })
  begin$ = this.actions$.pipe(
    ofType(WebsocketActionTypes.BeginConnection),
    tap(() => this.websocketService.begin())
  );

  @Effect()
  messageRecieved$ = this.actions$.pipe(
    ofType<MessageReceived>(WebsocketActionTypes.MessageReceived),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(getUserId))),
    map(([msg, userId]) => {
      switch (msg.type) {
        case MessageTypes.Chat: {
          const audio = new Audio('/assets/notify.mp3');
          audio.play();
          return new ChatMessageReceived(msg.message as ChatMessage, userId);
        }
        case MessageTypes.ChatAck: {
          return new ChatAckReceived(msg.message as ChatMessage);
        }
        case MessageTypes.WebRTCAck: {
          return new ReceivedCall(msg.message as WebRTCAckMessage);
        }
        case MessageTypes.WebRTCInit: {
          return new ReceivingCall(msg.message as WebRTCInitMessage);
        }
        case MessageTypes.WebRTC: {
          return new ReceivedWebRTC(msg.message as WebRTCMessage);
        }
      }
    })
  );

  @Effect({ dispatch: false })
  messageSend$ = this.actions$.pipe(
    ofType<ChatMessageSend>(WebsocketActionTypes.ChatMessageSend),
    map(action => action.payload),
    tap(msg => {
      return this.websocketService.send({
        type: MessageTypes.Chat,
        message: msg,
      });
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private websocketService: WebsocketService
  ) {}
}
