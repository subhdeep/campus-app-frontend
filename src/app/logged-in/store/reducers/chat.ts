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
  tid: number;
}

const initialState: ChatState = {
  messages: {},
  pending: {},
  loading: false,
  tid: 0,
};

export function chatReducer(
  state: ChatState = initialState,
  action: WebsocketActionsUnion | ChatActionsUnion
): ChatState {
  switch (action.type) {
    case WebsocketActionTypes.ChatMessageReceived: {
      const msgFrom = action.payload.from;
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
    case ChatActionTypes.GetMessages:
      return { ...state, loading: true };
    case ChatActionTypes.GetMessagesSuccess: {
      const messages = {
        ...state.messages,
      };
      messages[action.username] = action.messages.reverse();
      return { ...state, messages, loading: false };
    }
    case ChatActionTypes.GetMessagesFail: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
}
