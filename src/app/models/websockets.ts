export enum MessageTypes {
  Chat = 'chat',
  ChatAck = 'chat-ack',
}

export interface ChatMessage {
  to: string;
  body: string;
  from: string;
  id?: string;
  tid?: string;
}

type MessagesUnion = ChatMessage;

export interface WebsocketMessage {
  message: MessagesUnion;
  type: MessageTypes;
}
