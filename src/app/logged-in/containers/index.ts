import { Type } from '@angular/core';

import { CallingContainer } from './calling';
import { ChatContainer } from './chat';
import { ChatWrapperContainer } from './chat-wrapper';
import { LoggedInWrapperContainer } from './logged-in-wrapper';

export const containers: Type<any>[] = [
  CallingContainer,
  ChatContainer,
  ChatWrapperContainer,
  LoggedInWrapperContainer,
];

export const entryContainers: Type<any>[] = [CallingContainer];

export * from './calling';
export * from './chat';
export * from './chat-wrapper';
export * from './logged-in-wrapper';
