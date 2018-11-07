import { createSelector } from '@ngrx/store';
import { selectAuthState, AuthState } from '../reducers';
import { getUserEntities } from 'src/app/core/store/selectors/users.selector';

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

export const getLoggedIn = createSelector(
  selectAuthStatusState,
  state => state.loggedIn
);

export const getChecked = createSelector(
  selectAuthStatusState,
  state => state.checked
);

export const getUserId = createSelector(
  selectAuthStatusState,
  state => state.userId
);
export const getUser = createSelector(
  getUserId,
  getUserEntities,
  (userId, entities) => entities[userId]
);
