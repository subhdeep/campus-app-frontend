import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../../store/reducers';
import { BeginConnection } from '../../store/actions/websocket.actions';

@Component({
  templateUrl: './logged-in-wrapper.container.html',
  styleUrls: ['./logged-in-wrapper.container.scss'],
})
export class LoggedInWrapperContainer implements OnInit {
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new BeginConnection());
  }
}
