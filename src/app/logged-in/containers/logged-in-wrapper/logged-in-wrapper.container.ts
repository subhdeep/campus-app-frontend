import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import { User } from 'src/app/models/user';
import { ChatPreviewViewModel } from 'src/app/models/chat-preview';
import { getUser } from 'src/app/auth/store';

import { State } from '../../store/reducers';
import { BeginConnection } from '../../store/actions/websocket.actions';

@Component({
  templateUrl: './logged-in-wrapper.container.html',
  styleUrls: ['./logged-in-wrapper.container.scss'],
})
export class LoggedInWrapperContainer implements OnInit {
  public currentUser$: Observable<User>;
  public chatPreviews$: Observable<ChatPreviewViewModel[]>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new BeginConnection());

    this.currentUser$ = this.store.pipe(select(getUser));
    this.chatPreviews$ = of([]);
  }
}
