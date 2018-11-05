import { AuthActionTypes, AuthActionsUnion } from '../actions/auth.actions';
import {
  LoginContainerActionsUnion,
  LoginContainerActionTypes,
} from '../actions/login-container.actions';

export interface LoginContainerState {
  term: string;
  error: string | null;
  pending: boolean;
}

export const initialState: LoginContainerState = {
  term: '',
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
      };
    }

    case LoginContainerActionTypes.PerformSearch: {
      return {
        ...state,
        term: action.term,
      };
    }

    default: {
      return state;
    }
  }
}
