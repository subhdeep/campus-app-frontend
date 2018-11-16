import { createSelector } from '@ngrx/store';
import { selectLoggedInState } from '../reducers';

export const selectCallState = createSelector(
  selectLoggedInState,
  state => state.call
);

export const selectInCall = createSelector(
  selectCallState,
  state => state.inCall
);
