import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { OrderedSet } from 'immutable';

import { ChatPreview } from 'src/app/models/chat-preview';

export interface ChatPreviewState extends EntityState<ChatPreview> {
  orderedIds: OrderedSet<string>;
}

export const chatPreviewEntityAdapter = createEntityAdapter<ChatPreview>({
  selectId: chat => chat.userId,
});

export const initialState = {
  ...chatPreviewEntityAdapter.getInitialState(),
  orderedIds: OrderedSet(),
};

export function chatPreviewReducer(
  state: ChatPreviewState = initialState,
  action: Action
) {
  switch (action.type) {
    default:
      return state;
  }
}
