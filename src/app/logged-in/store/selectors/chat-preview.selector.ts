import {
  chatPreviewEntityAdapter,
  ChatPreviewState,
} from '../reducers/chat-preview';
import { createSelector } from '@ngrx/store';
import { selectLoggedInState } from '../reducers';
import { getUserEntities } from 'src/app/core/store/selectors/users.selector';
import { ChatPreviewViewModel } from 'src/app/models/chat-preview';

export const selectChatPreviewState = createSelector(
  selectLoggedInState,
  state => state.chatPreview
);

export const {
  selectIds: getPreviewIds,
  selectEntities: getPreviewEntities,
  selectAll: getAllPreviews,
  selectTotal: getTotalPreviews,
} = chatPreviewEntityAdapter.getSelectors(selectChatPreviewState);

const selectOrderedIds = createSelector(
  selectChatPreviewState,
  state => state.orderedIds
);

export const selectChatPreviewViewModels = createSelector(
  selectOrderedIds,
  getPreviewEntities,
  getUserEntities,
  (ordered, pEnt, uEnt) =>
    ordered
      .map(id => pEnt[id])
      .map(prev => {
        const prevView: ChatPreviewViewModel = {
          user: uEnt[prev.userId],
          firstMessage: prev.firstMessage,
        };
        return prevView;
      })
      .reverse()
      .toArray()
);
