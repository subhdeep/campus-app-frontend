import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export enum UserActionTypes {
  GET_ALL_USERS = '[Core] Get All Users',
  GET_ALL_USERS_SUCCESS = '[Core] Get All Users Success',
}

export class GetAllUsers implements Action {
  readonly type = UserActionTypes.GET_ALL_USERS;
}

export class GetAllUsersSuccess implements Action {
  readonly type = UserActionTypes.GET_ALL_USERS_SUCCESS;

  constructor(public users: User[]) {}
}

export type UserActionsUnion = GetAllUsers | GetAllUsersSuccess;
