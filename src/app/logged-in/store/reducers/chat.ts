import { ChatMessage } from 'src/app/models/websockets';
import {
  WebsocketActionsUnion,
  WebsocketActionTypes,
} from '../actions/websocket.actions';
import { ChatActionsUnion, ChatActionTypes } from '../actions/chat.actions';

export interface ChatState {
  messages: { [key: string]: ChatMessage[] };
  pending: { [key: string]: ChatMessage[] };
  loading: boolean;
  nextLink: { [key: string]: string };
  loadingMore: boolean;
  tid: number;
}

const initialState: ChatState = {
  messages: {},
  pending: {},
  loading: false,
  nextLink: {},
  loadingMore: false,
  tid: 0,
};

export function chatReducer(
  state: ChatState = initialState,
  action: WebsocketActionsUnion | ChatActionsUnion
): ChatState {
  switch (action.type) {
    case WebsocketActionTypes.ChatMessageReceived: {
      const msgFrom =
        action.payload.from === action.currentUser
          ? action.payload.to
          : action.payload.from;
      const messages = {
        ...state.messages,
      };
      if (messages[msgFrom] != null) {
        messages[msgFrom] = [...messages[msgFrom], action.payload];
      } else {
        messages[msgFrom] = [action.payload];
      }
      return {
        ...state,
        messages,
      };
    }
    case WebsocketActionTypes.ChatMessageSend: {
      const msgTo = action.payload.to;
      const pending = {
        ...state.pending,
      };
      if (pending[msgTo] != null) {
        pending[msgTo] = [...pending[msgTo], action.payload];
      } else {
        pending[msgTo] = [action.payload];
      }
      return {
        ...state,
        pending,
        tid: state.tid + 1,
      };
    }
    case WebsocketActionTypes.ChatAckReceived: {
      const msgTo = action.payload.to;
      const message = action.payload;

      const pending = {
        ...state.pending,
      };
      if (pending[msgTo] != null) {
        pending[msgTo] = pending[msgTo].filter(
          x => x.tid !== action.payload.tid
        );
      }

      const messages = {
        ...state.messages,
      };
      if (messages[msgTo] != null) {
        messages[msgTo] = [...messages[msgTo], message];
      } else {
        messages[msgTo] = [message];
      }

      return {
        ...state,
        messages,
        pending,
      };
    }
    case ChatActionTypes.GetMessages: {
      const nextLink = {
        ...state.nextLink,
      };
      nextLink[action.username] = '';
      return {
        ...state,
        nextLink,
        loadingMore: false,
        loading: true,
      };
    }
    case ChatActionTypes.GetMessagesSuccess: {
      const nextLink = {
        ...state.nextLink,
      };
      nextLink[action.username] = action.nextLink;
      const messages = {
        ...state.messages,
      };
      messages[action.username] = action.messages.reverse();
      return { ...state, messages, nextLink, loading: false };
    }
    case ChatActionTypes.GetMessagesFail: {
      const nextLink = {
        ...state.nextLink,
      };
      nextLink[action.username] = '';
      return { ...state, nextLink, loading: false };
    }
    case ChatActionTypes.GetMoreMessages:
      return {
        ...state,
        loadingMore: true,
      };
    case ChatActionTypes.GetMoreMessagesSuccess: {
      const nextLink = {
        ...state.nextLink,
      };
      nextLink[action.username] = action.nextLink;
      const messages = {
        ...state.messages,
      };
      messages[action.username] = [
        ...action.messages.reverse(),
        ...messages[action.username],
      ];
      return { ...state, messages, nextLink, loadingMore: false };
    }
    default:
      return state;
  }
}
