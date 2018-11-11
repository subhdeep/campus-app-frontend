import { User } from './user';
import { ChatMessage } from './websockets';

export interface ChatPreview {
  userId: string;
  firstMessage: ChatMessage;
}

export interface ChatPreviewViewModel {
  user: User;
  firstMessage: ChatMessage;
}
