import { createSelector } from '@ngrx/store';
import { selectLoggedInState } from '../reducers';

export const selectChatState = createSelector(
  selectLoggedInState,
  state => state.chat
);

export const selectMessages = createSelector(
  selectChatState,
  state => state.messages
);

export const selectPending = createSelector(
  selectChatState,
  state => state.pending
);

export const selectTid = createSelector(selectChatState, state => state.tid);

export const selectLoading = createSelector(
  selectChatState,
  state => state.loading
);
