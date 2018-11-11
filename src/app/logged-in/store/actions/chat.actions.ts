import { Action } from '@ngrx/store';
import { ChatMessage } from 'src/app/models/websockets';

export enum ChatActionTypes {
  GetMessages = '[LoggedIn] Get Messages',
  GetMessagesSuccess = '[LoggedIn] Get Messages Success',
  GetMessagesFail = '[LoggedIn] Get Messages Fail',
}

export class GetMessages implements Action {
  readonly type = ChatActionTypes.GetMessages;
  constructor(public username: string) {}
}

export class GetMessagesSuccess implements Action {
  readonly type = ChatActionTypes.GetMessagesSuccess;
  constructor(public messages: ChatMessage[], public username: string) {}
}

export class GetMessagesFail implements Action {
  readonly type = ChatActionTypes.GetMessagesFail;
  constructor(public err: any) {}
}

export type ChatActionsUnion =
  | GetMessages
  | GetMessagesFail
  | GetMessagesSuccess;
