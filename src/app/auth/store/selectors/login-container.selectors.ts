import { createSelector } from '@ngrx/store';

import { getAllUsers } from 'src/app/core/store/selectors/users.selector';
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

export const selectTerm = createSelector(
  selectLoginContainerState,
  state => state.term
);

export const selectFixed = createSelector(
  selectLoginContainerState,
  state => state.fixed
);

export const selectFilteredStudents = createSelector(
  getAllUsers,
  selectTerm,
  selectFixed,
  (users, term, fixed) => {
    if (term.length <= 3) return [];
    if (fixed) {
      return users.filter(user => user.username === term);
    }
    return users.filter(user => {
      const lcTerm = term.toLowerCase().replace(/\s\s+/g, ' ');
      const lcName = user.name.toLowerCase().replace(/\s\s+/g, ' ');
      return lcName.startsWith(lcTerm) || user.username.startsWith(lcTerm);
    });
  }
);
