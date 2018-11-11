import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { State } from '../../store/reducers';
import { GetAllUsers } from '../../store/actions/users.actions';
import { getLoading } from '../../store/selectors/users.selector';

@Component({
  selector: 'ca-root',
  templateUrl: './app.container.html',
  styleUrls: ['./app.container.scss'],
})
export class AppContainer implements OnInit {
  public loading$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new GetAllUsers());
    this.loading$ = this.store.pipe(select(getLoading));
  }
}
