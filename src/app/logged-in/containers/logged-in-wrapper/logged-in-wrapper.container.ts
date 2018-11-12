import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Store, select } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import { User } from 'src/app/models/user';
import { ChatPreviewViewModel } from 'src/app/models/chat-preview';
import { getUser } from 'src/app/auth/store';

import { State } from '../../store/reducers';
import { BeginConnection } from '../../store/actions/websocket.actions';
import { GetPreviews } from '../../store/actions/chat-preview.actions';
import { selectChatPreviewViewModels } from '../../store/selectors/chat-preview.selector';
import { Logout } from 'src/app/auth/store/actions/auth.actions';

@Component({
  templateUrl: './logged-in-wrapper.container.html',
  styleUrls: ['./logged-in-wrapper.container.scss'],
})
export class LoggedInWrapperContainer implements OnInit {
  public currentUser$: Observable<User>;
  public chatPreviews$: Observable<ChatPreviewViewModel[]>;

  constructor(public media: ObservableMedia, private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new BeginConnection());
    this.store.dispatch(new GetPreviews());

    this.currentUser$ = this.store.pipe(select(getUser));
    this.chatPreviews$ = this.store.pipe(select(selectChatPreviewViewModels));
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }

  get isMobile(): boolean {
    return this.media.isActive('xs');
  }

  get mode(): string {
    if (this.isMobile) {
      return 'over';
    }
    return 'side';
  }
}
