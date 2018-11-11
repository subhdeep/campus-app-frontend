import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';

import {
  AuthActionTypes,
  Login,
  LoginFailure,
  LoginSuccess,
  CheckLogin,
  CheckLoginResult,
  Logout,
} from '../actions/auth.actions';
import { LoginCred } from 'src/app/models/login-cred';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    switchMap((auth: LoginCred) =>
      this.authService.login(auth).pipe(
        map(res => res.username),
        map(userId => new LoginSuccess({ userId })),
        catchError(error => of(new LoginFailure(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    switchMap(() =>
      this.authService.logout().pipe(
        catchError(error => of(null)),
        tap(() => this.router.navigate(['/login']))
      )
    )
  );

  @Effect()
  checkLogin$ = this.actions$.pipe(
    ofType<CheckLogin>(AuthActionTypes.CheckLogin),
    switchMap(() =>
      this.authService.check().pipe(
        map(res => res.username),
        map(userId => new CheckLoginResult(true, userId)),
        catchError(err => of(new CheckLoginResult(false)))
      )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
    tap(authed => {
      this.router.navigate(['/login']);
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
