import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { User } from 'src/app/models/user';
import { UserActionsUnion, UserActionTypes } from '../actions/users.actions';

export const userAdapter = createEntityAdapter<User>({
  selectId: user => user.username,
});

export interface UserState extends EntityState<User> {
  loading: boolean;
}

const initialState: UserState = {
  ...userAdapter.getInitialState(),
  loading: false,
};

export function userReducer(
  state: UserState = initialState,
  action: UserActionsUnion
): UserState {
  switch (action.type) {
    case UserActionTypes.GET_ALL_USERS:
      return { ...state, loading: true };

    case UserActionTypes.GET_ALL_USERS_SUCCESS:
      return userAdapter.addMany(action.users, { ...state, loading: false });

    default:
      return state;
  }
}
