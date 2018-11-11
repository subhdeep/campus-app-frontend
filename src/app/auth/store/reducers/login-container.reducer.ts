import { AuthActionTypes, AuthActionsUnion } from '../actions/auth.actions';
import {
  LoginContainerActionsUnion,
  LoginContainerActionTypes,
} from '../actions/login-container.actions';

export interface LoginContainerState {
  term: string;
  fixed: boolean;
  error: string | null;
  pending: boolean;
}

export const initialState: LoginContainerState = {
  term: '',
  fixed: false,
  error: null,
  pending: false,
};

export function loginContainerReducer(
  state = initialState,
  action: AuthActionsUnion | LoginContainerActionsUnion
): LoginContainerState {
  switch (action.type) {
    case AuthActionTypes.Login: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    case LoginContainerActionTypes.ResetSearch: {
      return {
        ...state,
        term: '',
        fixed: false,
      };
    }

    case LoginContainerActionTypes.PerformSearch: {
      return {
        ...state,
        term: action.term,
      };
    }

    case LoginContainerActionTypes.FixSearch: {
      return {
        ...state,
        term: action.username,
        fixed: true,
      };
    }

    default: {
      return state;
    }
  }
}
