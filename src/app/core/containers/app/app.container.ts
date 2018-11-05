import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../../store/reducers';
import { GetAllUsers } from '../../store/actions/users.actions';

@Component({
  selector: 'ca-root',
  templateUrl: './app.container.html',
  styleUrls: ['./app.container.scss'],
})
export class AppContainer implements OnInit {
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new GetAllUsers());
  }
}
