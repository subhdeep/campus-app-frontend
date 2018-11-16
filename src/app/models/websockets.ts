import { WebRTCMessagesUnion } from './webrtc';

export enum MessageTypes {
  Chat = 'chat',
  ChatAck = 'chat-ack',
  WebRTC = 'webrtc',
  WebRTCAck = 'webrtc-ack',
  WebRTCBusy = 'webrtc-busy',
  WebRTCCancel = 'webrtc-cancel',
  WebRTCInit = 'webrtc-init',
}

export interface ChatMessage {
  to: string;
  body: string;
  from: string;
  id?: string;
  tid?: number;
  created_at?: string;
}

type MessagesUnion = ChatMessage | WebRTCMessagesUnion;

export interface WebsocketMessage {
  message: MessagesUnion;
  type: MessageTypes;
}
