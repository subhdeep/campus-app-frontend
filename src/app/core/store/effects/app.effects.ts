import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  GetAllUsers,
  UserActionTypes,
  GetAllUsersSuccess,
} from '../actions/users.actions';
import { UsersService } from '../../services/users.service';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private users: UsersService) {}

  @Effect()
  getUsers$ = this.actions$.pipe(
    ofType<GetAllUsers>(UserActionTypes.GET_ALL_USERS),
    switchMap(() => this.users.getAll()),
    map(users => new GetAllUsersSuccess(users))
  );
}
