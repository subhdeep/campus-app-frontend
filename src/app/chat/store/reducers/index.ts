import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/core/store/reducers';

export interface ChatState {}

export interface State extends fromRoot.State {
  chat: ChatState;
}

export const reducers: ActionReducerMap<ChatState> = {};

export const selectAuthState = createFeatureSelector<State, ChatState>('chat');
