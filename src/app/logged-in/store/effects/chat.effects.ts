import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ChatService } from '../../services';
import {
  GetMessages,
  ChatActionTypes,
  GetMessagesSuccess,
  GetMessagesFail,
  GetMoreMessages,
  GetMoreMessagesSuccess,
  GetMoreMessagesFail,
} from '../actions/chat.actions';
import {
  GetPreviews,
  ChatPreviewActionTypes,
  GetPreviewsSuccess,
  GetPreviewsFail,
} from '../actions/chat-preview.actions';
import {
  PushNotification,
  WebsocketActionTypes,
} from '../actions/websocket.actions';

@Injectable()
export class ChatEffects {
  @Effect()
  messages$ = this.actions$.pipe(
    ofType<GetMessages>(ChatActionTypes.GetMessages),
    map(action => action.username),
    switchMap(username =>
      this.chatService.getMessages(username).pipe(
        map(
          ([messages, link]) => new GetMessagesSuccess(messages, username, link)
        ),
        catchError(err => of(new GetMessagesFail(err, username)))
      )
    )
  );

  @Effect()
  moreMessages$ = this.actions$.pipe(
    ofType<GetMoreMessages>(ChatActionTypes.GetMoreMessages),
    switchMap(action =>
      this.chatService.getMoreMessages(action.link).pipe(
        map(
          ([messages, link]) =>
            new GetMoreMessagesSuccess(messages, action.username, link)
        ),
        catchError(err => of(new GetMoreMessagesFail(err, action.username)))
      )
    )
  );

  @Effect()
  previews$ = this.actions$.pipe(
    ofType<GetPreviews>(ChatPreviewActionTypes.GetPreviews),
    switchMap(() =>
      this.chatService.getRecents().pipe(
        map(messages => new GetPreviewsSuccess(messages)),
        catchError(err => of(new GetPreviewsFail(err)))
      )
    )
  );

  @Effect({ dispatch: false })
  pushSubscription$ = this.actions$.pipe(
    ofType<PushNotification>(WebsocketActionTypes.PushNotification),
    map(action => action.payload),
    switchMap(sub =>
      this.chatService.pushSubscription(sub).pipe(
        tap(() => {
          localStorage.setItem('push-notifications', 'subscribed');
        })
      )
    )
  );

  constructor(private actions$: Actions, private chatService: ChatService) {}
}
