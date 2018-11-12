import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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
  loading: boolean;
  @Input()
  loadingMore: boolean;
  @Input()
  nextLink: { [key: string]: string };
  @Input()
  userId: string;
  @Input()
  messages: ChatMessage[];
  @Input()
  pending: ChatMessage[];

  @Output()
  getMore = new EventEmitter<string>();

  @ViewChild('container')
  container: ElementRef<HTMLDivElement>;

  constructor() {
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

  get link(): string {
    return this.nextLink[this.userId] != null ? this.nextLink[this.userId] : '';
  }

  get hasMore(): boolean {
    return this.link !== '';
  }

  onScroll() {
    this.getMore.emit(this.link);
  }
}
