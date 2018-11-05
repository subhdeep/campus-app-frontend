import { createSelector } from '@ngrx/store';

import { getAllUsers } from 'src/app/core/store/selectors/users.selector';
import { selectLoggedInState } from '../reducers';

export const selectChatWrapperState = createSelector(
  selectLoggedInState,
  state => state.chatWrapper
);

export const selectSearchTerm = createSelector(
  selectChatWrapperState,
  state => state.searchTerm
);

export const selectFilteredStudents = createSelector(
  getAllUsers,
  selectSearchTerm,
  (users, term) => {
    if (term.length <= 3) return [];
    return users.filter(user => {
      const lcTerm = term.toLowerCase().replace(/\s\s+/g, ' ');
      const lcName = user.name.toLowerCase().replace(/\s\s+/g, ' ');
      return lcName.startsWith(lcTerm) || user.username.startsWith(lcTerm);
    });
  }
);
