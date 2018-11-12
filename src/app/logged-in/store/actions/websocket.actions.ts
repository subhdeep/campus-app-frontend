import { Action } from '@ngrx/store';

import { WebsocketMessage, ChatMessage } from 'src/app/models/websockets';

export enum WebsocketActionTypes {
  BeginConnection = '[LoggedIn] Begin Connection',
  MessageReceived = '[LoggedIn] Message Received',
  ChatMessageReceived = '[LoggedIn] Chat Message Received',
  ChatMessageSend = '[LoggedIn] Chat Message Send',
  ChatAckReceived = '[LoggedIn] Chat Acknowledgement Received',
  PushNotification = '[LoggedIn] Push Notifications',
}

export class BeginConnection implements Action {
  readonly type = WebsocketActionTypes.BeginConnection;
}

export class MessageReceived implements Action {
  readonly type = WebsocketActionTypes.MessageReceived;

  constructor(public payload: WebsocketMessage) {}
}

export class ChatMessageReceived implements Action {
  readonly type = WebsocketActionTypes.ChatMessageReceived;

  constructor(public payload: ChatMessage) {}
}

export class ChatMessageSend implements Action {
  readonly type = WebsocketActionTypes.ChatMessageSend;

  constructor(public payload: ChatMessage) {}
}

export class ChatAckReceived implements Action {
  readonly type = WebsocketActionTypes.ChatAckReceived;

  constructor(public payload: ChatMessage) {}
}

export class PushNotification implements Action {
  readonly type = WebsocketActionTypes.PushNotification;

  constructor(public payload: PushSubscription) {}
}

export type WebsocketActionsUnion =
  | BeginConnection
  | MessageReceived
  | ChatAckReceived
  | ChatMessageReceived
  | ChatMessageSend
  | PushNotification;
