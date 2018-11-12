import { Action } from '@ngrx/store';
import { ChatMessage } from 'src/app/models/websockets';

export enum ChatActionTypes {
  GetMessages = '[LoggedIn] Get Messages',
  GetMessagesSuccess = '[LoggedIn] Get Messages Success',
  GetMessagesFail = '[LoggedIn] Get Messages Fail',
  GetMoreMessages = '[LoggedIn] Get More Messages',
  GetMoreMessagesSuccess = '[LoggedIn] Get More Messages Success',
  GetMoreMessagesFail = '[LoggedIn] Get More Messages Fail',
}

export class GetMessages implements Action {
  readonly type = ChatActionTypes.GetMessages;
  constructor(public username: string) {}
}

export class GetMessagesSuccess implements Action {
  readonly type = ChatActionTypes.GetMessagesSuccess;
  constructor(
    public messages: ChatMessage[],
    public username: string,
    public nextLink: string
  ) {}
}

export class GetMessagesFail implements Action {
  readonly type = ChatActionTypes.GetMessagesFail;
  constructor(public err: any, public username: string) {}
}

export class GetMoreMessages implements Action {
  readonly type = ChatActionTypes.GetMoreMessages;
  constructor(public username: string, public link: string) {}
}

export class GetMoreMessagesSuccess implements Action {
  readonly type = ChatActionTypes.GetMoreMessagesSuccess;
  constructor(
    public messages: ChatMessage[],
    public username: string,
    public nextLink: string
  ) {}
}

export class GetMoreMessagesFail implements Action {
  readonly type = ChatActionTypes.GetMoreMessagesFail;
  constructor(public err: any, public username: string) {}
}

export type ChatActionsUnion =
  | GetMessages
  | GetMessagesFail
  | GetMessagesSuccess
  | GetMoreMessages
  | GetMoreMessagesFail
  | GetMoreMessagesSuccess;
