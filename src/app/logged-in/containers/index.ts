import { Type } from '@angular/core';

import { ChatWrapperContainer } from './chat-wrapper';
import { LoggedInWrapperContainer } from './logged-in-wrapper';

export const containers: Type<any>[] = [
  ChatWrapperContainer,
  LoggedInWrapperContainer,
];

export * from './chat-wrapper';
export * from './logged-in-wrapper';
