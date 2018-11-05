import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { map, tap, exhaustMap, mergeMap } from 'rxjs/operators';

import { WebsocketService } from '../../services';
import {
  BeginConnection,
  WebsocketActionTypes,
  MessageReceived,
  ChatMessageReceived,
  ChatMessageSend,
  ChatAckReceived,
} from '../actions/websocket.actions';
import { MessageTypes, ChatMessage } from 'src/app/models/websockets';

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
    map(msg => {
      switch (msg.type) {
        case MessageTypes.Chat: {
          const chatMsg = msg.message as ChatMessage;
          chatMsg.to = 'me';
          return new ChatMessageReceived(chatMsg);
        }
        case MessageTypes.ChatAck: {
          const chatMsg = msg.message as ChatMessage;
          chatMsg.from = 'me';
          return new ChatAckReceived(chatMsg);
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
    private websocketService: WebsocketService
  ) {}
}
