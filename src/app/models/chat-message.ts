import { ChatMessage } from './websockets';

export interface ChatMessageViewModel extends ChatMessage {
  pending: boolean;
}
