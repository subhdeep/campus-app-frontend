import { AuthActionsUnion, AuthActionTypes } from '../actions/auth.actions';
import { User } from '../../../models/user';

export interface StatusState {
  loggedIn: boolean;
  checked: boolean;
  userId: string | null;
}

const initialState: StatusState = {
  loggedIn: false,
  checked: false,
  userId: null,
};

export function statusReducer(
  state = initialState,
  action: AuthActionsUnion
): StatusState {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
        userId: action.payload.userId,
      };
    }

    case AuthActionTypes.CheckLoginResult: {
      return {
        ...state,
        checked: true,
        loggedIn: action.result,
        userId: action.result ? action.userId : null,
      };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
