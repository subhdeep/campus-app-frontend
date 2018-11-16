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
          const audio = new Audio();
          audio.src = '/assets/notify.mp3';
          audio.load();
          audio.play();
          return new ChatMessageReceived(msg.message, userId);
        }
        case MessageTypes.ChatAck: {
          return new ChatAckReceived(msg.message);
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
