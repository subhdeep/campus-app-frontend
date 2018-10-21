import { AuthActionTypes, AuthActionsUnion } from '../actions/auth.actions';

export interface LoginContainerState {
  error: string | null;
  pending: boolean;
}

export const initialState: LoginContainerState = {
  error: null,
  pending: false,
};

export function loginContainerReducer(
  state = initialState,
  action: AuthActionsUnion
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

    default: {
      return state;
    }
  }
}
