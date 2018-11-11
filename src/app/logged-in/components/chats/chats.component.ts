import { Component, ElementRef, Input, ViewChild, NgZone } from '@angular/core';
import { ChatMessage } from 'src/app/models/websockets';
import { ChatMessageViewModel } from 'src/app/models/chat-message';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ca-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent {
  private _prevChatHeight: number = 0;

  @Input()
  userId: string;
  @Input()
  messages: ChatMessage[];
  @Input()
  pending: ChatMessage[];

  @ViewChild('container')
  container: ElementRef<HTMLDivElement>;

  constructor(private zone: NgZone) {
    setTimeout(() => {
      this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
    }, 0);
  }

  get merged(): ChatMessageViewModel[] {
    const messages: ChatMessageViewModel[] = this.messages.map(x => {
      return {
        ...x,
        pending: false,
      };
    });
    const pending: ChatMessageViewModel[] = this.pending.map(x => {
      return {
        ...x,
        pending: true,
      };
    });
    return [...messages, ...pending];
  }
}
