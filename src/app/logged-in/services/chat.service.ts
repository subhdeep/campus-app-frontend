import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, interval, merge, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { ChatMessage } from 'src/app/models/websockets';
import { ChatPreview } from 'src/app/models/chat-preview';

@Injectable()
export class ChatService {
  constructor(private http: HttpClient) {}

  getMessages(username: string): Observable<[ChatMessage[], string]> {
    return this.http
      .get<ChatMessage[]>('/api/messages', {
        params: { username },
        observe: 'response',
      })
      .pipe(
        map(resp => {
          let link = '';
          if (resp.headers.has('link') || resp.headers.has('Link')) {
            link = resp.headers.get('link') || resp.headers.get('Link');
            link = `/api${link}`;
          }
          return [resp.body, link] as [ChatMessage[], string];
        })
      );
  }

  getMoreMessages(link: string): Observable<[ChatMessage[], string]> {
    return this.http.get<ChatMessage[]>(link, { observe: 'response' }).pipe(
      map(resp => {
        let link = '';
        if (resp.headers.has('link') || resp.headers.has('Link')) {
          link = resp.headers.get('link') || resp.headers.get('Link');
          link = `/api${link}`;
        }
        return [resp.body, link] as [ChatMessage[], string];
      })
    );
  }

  getRecents(): Observable<ChatPreview[]> {
    return this.http.get<ChatPreview[]>('/api/recents');
  }

  getOnline(userId: string): Observable<boolean> {
    return merge(interval(2 * 60 * 1000), of(0)).pipe(
      switchMap(() =>
        this.http
          .get('/api/online', {
            params: {
              username: userId,
            },
            observe: 'response',
          })
          .pipe(
            map(resp => resp.status === 200),
            catchError(err => of(false))
          )
      )
    );
  }
}
