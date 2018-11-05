import {
  ChatWrapperActionsUnion,
  ChatWrapperActionTypes,
} from '../actions/chat-wrapper.actions';

export interface ChatWrapperState {
  searchTerm: string;
}

const initialState: ChatWrapperState = {
  searchTerm: '',
};

export function chatWrapperReducer(
  state: ChatWrapperState = initialState,
  action: ChatWrapperActionsUnion
): ChatWrapperState {
  switch (action.type) {
    case ChatWrapperActionTypes.ResetSearch:
      return {
        ...state,
        searchTerm: '',
      };

    case ChatWrapperActionTypes.PerformSearch:
      return {
        ...state,
        searchTerm: action.term,
      };

    default:
      return state;
  }
}
