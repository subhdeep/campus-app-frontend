import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

import { ChatMessage } from 'src/app/models/websockets';
import { User } from 'src/app/models/user';
import { getUserEntities } from 'src/app/core/store/selectors/users.selector';
import { State } from '../../store/reducers';
import {
  selectMessages,
  selectPending,
  selectTid,
  selectLoading,
  selectLoadingMore,
  selectNextLink,
} from '../../store/selectors/chat-message.selector';
import { ChatMessageSend } from '../../store/actions/websocket.actions';
import { GetMessages, GetMoreMessages } from '../../store/actions/chat.actions';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  templateUrl: './chat.container.html',
  styleUrls: ['./chat.container.scss'],
})
export class ChatContainer implements OnDestroy, OnInit {
  private userId: string;
  private userIdSubs$: Subscription;
  private tid: number;
  private tidSubs$: Subscription;

  public bodyCtrl = new FormControl('');

  public chatMessages$: Observable<ChatMessage[]>;
  public loading$: Observable<boolean>;
  public pending$: Observable<ChatMessage[]>;
  public user$: Observable<User>;
  public loadingMore$: Observable<boolean>;
  public nextLink$: Observable<{ [key: string]: string }>;

  constructor(
    private media: ObservableMedia,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.chatMessages$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.store.pipe(
          select(selectMessages),
          map(msgMap => msgMap[params.get('userId')]),
          map(val => (val != null ? val : []))
        )
      )
    );
    this.pending$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.store.pipe(
          select(selectPending),
          map(msgMap => msgMap[params.get('userId')]),
          map(val => (val != null ? val : []))
        )
      )
    );
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.store.pipe(
          select(getUserEntities),
          map(entities => entities[params.get('userId')])
        )
      )
    );
    this.loading$ = this.store.pipe(select(selectLoading));
    this.loadingMore$ = this.store.pipe(select(selectLoadingMore));
    this.nextLink$ = this.store.pipe(select(selectNextLink));

    this.userIdSubs$ = this.route.paramMap
      .pipe(
        map(params => params.get('userId')),
        tap(userId => this.store.dispatch(new GetMessages(userId)))
      )
      .subscribe(userId => (this.userId = userId));

    this.tidSubs$ = this.store
      .pipe(select(selectTid))
      .subscribe(tid => (this.tid = tid));
  }

  onGetMore(link: string) {
    this.store.dispatch(new GetMoreMessages(this.userId, link));
  }

  onSend() {
    if (this.bodyCtrl.value !== '') {
      this.store.dispatch(
        new ChatMessageSend({
          to: this.userId,
          from: 'me',
          tid: this.tid,
          body: this.bodyCtrl.value,
        })
      );
    }
    this.bodyCtrl.setValue('');
  }

  url(user: User): SafeStyle {
    const iitkhome = `http://home.iitk.ac.in/~${user.username}/dp`;
    const oaimage = `https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${user.roll}_0.jpg`;
    const url = `url("${iitkhome}"), url("${oaimage}")`;
    return this.sanitizer.bypassSecurityTrustStyle(url);
  }

  ngOnDestroy() {
    if (this.userIdSubs$) {
      this.userIdSubs$.unsubscribe();
    }
    if (this.tidSubs$) {
      this.tidSubs$.unsubscribe();
    }
  }

  get isMobile(): boolean {
    return this.media.isActive('xs');
  }
}
