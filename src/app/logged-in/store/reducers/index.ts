import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/core/store/reducers';
import { CallState, callReducer } from './call';
import { ChatState, chatReducer } from './chat';
import { ChatPreviewState, chatPreviewReducer } from './chat-preview';
import { ChatWrapperState, chatWrapperReducer } from './chat-wrapper';

export interface LoggedInState {
  call: CallState;
  chat: ChatState;
  chatWrapper: ChatWrapperState;
  chatPreview: ChatPreviewState;
}

export const reducers: ActionReducerMap<LoggedInState> = {
  call: callReducer,
  chat: chatReducer,
  chatWrapper: chatWrapperReducer,
  chatPreview: chatPreviewReducer,
};

// Type Magic for the blissful mind
export interface State extends fromRoot.State {
  loggedIn: LoggedInState;
}

export const selectLoggedInState = createFeatureSelector<State, LoggedInState>(
  'loggedIn'
);
