import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take, tap, switchMap } from 'rxjs/operators';
import { State } from '../store/reducers';
import { getLoggedIn, getChecked } from '../store';
import { LoginRedirect, CheckLogin } from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  canActivate(): Observable<boolean> {
    return this.checkLoginState().pipe(
      switchMap(() => {
        return this.checkLoggedIn();
      })
    );
  }

  // check if user is logged in
  checkLoggedIn(): Observable<boolean> {
    return this.store.pipe(
      select(getLoggedIn),
      take(1),
      tap(loggedIn => {
        if (!loggedIn) {
          this.store.dispatch(new LoginRedirect());
        }
      })
    );
  }

  // Check if login state has been confirmed once
  checkLoginState(): Observable<boolean> {
    return this.store.pipe(
      select(getChecked),
      tap(checked => {
        if (!checked) {
          this.store.dispatch(new CheckLogin());
        }
      }),
      filter(checked => checked),
      take(1)
    );
  }
}
