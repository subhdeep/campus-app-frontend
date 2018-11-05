import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { Observable, Observer, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { WebsocketMessage } from 'src/app/models/websockets';

import { State } from '../store/reducers';
import { MessageReceived } from '../store/actions/websocket.actions';

@Injectable()
export class WebsocketService {
  private _subject: Subject<MessageEvent>;
  private messages: Subject<WebsocketMessage>;

  constructor(
    private store: Store<State>,
    @Inject(DOCUMENT) private document
  ) {}

  public connect(url): Subject<MessageEvent> {
    if (!this._subject) {
      this._subject = this.create(url);
    }
    return this._subject;
  }

  private create(url): Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };
    return Subject.create(observer, observable);
  }

  public begin() {
    const host = this.document.location.host;
    this.messages = <Subject<WebsocketMessage>>this.connect(
      `ws://${host}/api/ws`
    ).pipe(
      map(
        (response: MessageEvent): WebsocketMessage => {
          console.log(response);
          let data = JSON.parse(response.data);
          return data;
        }
      )
    );
    this.messages.subscribe(msg =>
      this.store.dispatch(new MessageReceived(msg))
    );
  }

  public send(payload: WebsocketMessage) {
    this.messages.next(payload);
  }
}
