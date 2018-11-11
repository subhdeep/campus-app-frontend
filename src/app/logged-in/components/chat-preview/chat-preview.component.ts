import { Component, Input } from '@angular/core';

import { ChatPreviewViewModel } from 'src/app/models/chat-preview';

@Component({
  selector: 'ca-chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrls: ['./chat-preview.component.scss'],
})
export class ChatPreviewComponent {
  @Input()
  chat: ChatPreviewViewModel;
}
