import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ChatService } from '../../services';
import {
  GetMessages,
  ChatActionTypes,
  GetMessagesSuccess,
  GetMessagesFail,
} from '../actions/chat.actions';
import {
  GetPreviews,
  ChatPreviewActionTypes,
  GetPreviewsSuccess,
  GetPreviewsFail,
} from '../actions/chat-preview.actions';

@Injectable()
export class ChatEffects {
  @Effect()
  messages$ = this.actions$.pipe(
    ofType<GetMessages>(ChatActionTypes.GetMessages),
    map(action => action.username),
    switchMap(username =>
      this.chatService.getMessages(username).pipe(
        map(messages => new GetMessagesSuccess(messages, username)),
        catchError(err => of(new GetMessagesFail(err)))
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

  constructor(private actions$: Actions, private chatService: ChatService) {}
}
