import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ChatMessage } from 'src/app/models/websockets';

@Injectable()
export class ChatService {
  constructor(private http: HttpClient) {}

  getMessages(username: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>('/api/messages', {
      params: { username },
    });
  }
}
