import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ChatMessage } from 'src/app/models/websockets';
import { ChatPreview } from 'src/app/models/chat-preview';

@Injectable()
export class ChatService {
  constructor(private http: HttpClient) {}

  getMessages(username: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>('/api/messages', {
      params: { username },
    });
  }

  getRecents(): Observable<ChatPreview[]> {
    return this.http.get<ChatPreview[]>('/api/recents');
  }
}
