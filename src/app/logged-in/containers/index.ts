import { Type } from '@angular/core';

import { ChatContainer } from './chat';
import { ChatWrapperContainer } from './chat-wrapper';
import { LoggedInWrapperContainer } from './logged-in-wrapper';

export const containers: Type<any>[] = [
  ChatContainer,
  ChatWrapperContainer,
  LoggedInWrapperContainer,
];

export * from './chat';
export * from './chat-wrapper';
export * from './logged-in-wrapper';
