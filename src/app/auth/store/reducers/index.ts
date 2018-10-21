import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { StatusState, statusReducer } from './status.reducer';

import * as fromRoot from '../../../core/store/reducers';
import {
  LoginContainerState,
  loginContainerReducer,
} from './login-container.reducer';

export interface AuthState {
  status: StatusState;
  loginContainer: LoginContainerState;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  status: statusReducer,
  loginContainer: loginContainerReducer,
};

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');
