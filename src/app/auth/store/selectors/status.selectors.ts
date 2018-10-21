import { createSelector } from '@ngrx/store';
import { selectAuthState, AuthState } from '../reducers';

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

export const getLoggedIn = createSelector(
  selectAuthStatusState,
  state => state.loggedIn
);

export const getUser = createSelector(
  selectAuthStatusState,
  state => state.user
);
