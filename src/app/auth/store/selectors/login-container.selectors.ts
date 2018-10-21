import { createSelector } from '@ngrx/store';
import { selectAuthState, AuthState } from '../reducers';

export const selectLoginContainerState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginContainer
);

export const getLoginPageError = createSelector(
  selectLoginContainerState,
  state => state.error
);

export const getLoginPagePending = createSelector(
  selectLoginContainerState,
  state => state.pending
);
