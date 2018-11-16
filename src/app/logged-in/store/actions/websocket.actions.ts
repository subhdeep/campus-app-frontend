import { Action } from '@ngrx/store';

import { WebsocketMessage, ChatMessage } from 'src/app/models/websockets';
import {
  WebRTCMessage,
  WebRTCAckMessage,
  WebRTCInitMessage,
} from 'src/app/models/webrtc';

export enum WebsocketActionTypes {
  BeginConnection = '[LoggedIn] Begin Connection',
  MessageReceived = '[LoggedIn] Message Received',
  ChatMessageReceived = '[LoggedIn] Chat Message Received',
  ChatMessageSend = '[LoggedIn] Chat Message Send',
  ChatAckReceived = '[LoggedIn] Chat Acknowledgement Received',
  PushNotification = '[LoggedIn] Push Notifications',
  WebRTC = '[LoggedIn] WebRTC Message Received',
  WebRTCAck = '[LoggedIn] WebRTC Ack Received',
  WebRTCInit = '[LoggedIn] WebRTC Init Received',
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

  constructor(public payload: ChatMessage, public currentUser: string) {}
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

export class WebRTC implements Action {
  readonly type = WebsocketActionTypes.WebRTC;

  constructor(public payload: WebRTCMessage) {}
}

export class WebRTCAck implements Action {
  readonly type = WebsocketActionTypes.WebRTCAck;

  constructor(public payload: WebRTCAckMessage) {}
}

export class WebRTCInit implements Action {
  readonly type = WebsocketActionTypes.WebRTCInit;

  constructor(public payload: WebRTCInitMessage) {}
}

export type WebsocketActionsUnion =
  | BeginConnection
  | MessageReceived
  | ChatAckReceived
  | ChatMessageReceived
  | ChatMessageSend
  | WebRTC
  | WebRTCAck
  | WebRTCInit
  | PushNotification;
