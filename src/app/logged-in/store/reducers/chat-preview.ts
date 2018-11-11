import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { OrderedSet } from 'immutable';

import { ChatPreview } from 'src/app/models/chat-preview';
import {
  ChatPreviewActionsUnion,
  ChatPreviewActionTypes,
} from '../actions/chat-preview.actions';
import {
  WebsocketActionTypes,
  WebsocketActionsUnion,
} from '../actions/websocket.actions';

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
  action: ChatPreviewActionsUnion | WebsocketActionsUnion
) {
  switch (action.type) {
    case ChatPreviewActionTypes.GetPreviewsSuccess: {
      return chatPreviewEntityAdapter.upsertMany(action.payload, {
        ...state,
        orderedIds: OrderedSet(action.payload.map(x => x.userId).reverse()),
      });
    }
    case WebsocketActionTypes.ChatMessageReceived: {
      return chatPreviewEntityAdapter.upsertOne(
        { userId: action.payload.from, firstMessage: action.payload },
        {
          ...state,
          orderedIds: state.orderedIds.add(action.payload.from),
        }
      );
    }
    case WebsocketActionTypes.ChatAckReceived: {
      return chatPreviewEntityAdapter.upsertOne(
        { userId: action.payload.to, firstMessage: action.payload },
        {
          ...state,
          orderedIds: state.orderedIds.add(action.payload.to),
        }
      );
    }
    default:
      return state;
  }
}
