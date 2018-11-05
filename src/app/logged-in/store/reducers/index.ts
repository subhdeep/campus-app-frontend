import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/core/store/reducers';
import { ChatState, chatReducer } from './chat';
import { ChatWrapperState, chatWrapperReducer } from './chat-wrapper';

export interface LoggedInState {
  chat: ChatState;
  chatWrapper: ChatWrapperState;
}

export const reducers: ActionReducerMap<LoggedInState> = {
  chat: chatReducer,
  chatWrapper: chatWrapperReducer,
};

// Type Magic for the blissful mind
export interface State extends fromRoot.State {
  loggedIn: LoggedInState;
}

export const selectLoggedInState = createFeatureSelector<State, LoggedInState>(
  'loggedIn'
);
