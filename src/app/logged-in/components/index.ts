import { Type } from '@angular/core';

import { ChatsComponent } from './chats';
import { ChatPreviewComponent } from './chat-preview';
import { NavbarComponent } from './navbar';
import { SidenavComponent } from './sidenav';

export const components: Type<any>[] = [
  ChatsComponent,
  ChatPreviewComponent,
  NavbarComponent,
  SidenavComponent,
];

export * from './chats';
export * from './chat-preview';
export * from './navbar';
export * from './sidenav';
