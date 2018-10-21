import { AuthActionsUnion, AuthActionTypes } from '../actions/auth.actions';
import { User } from '../../../models/user';

export interface StatusState {
  loggedIn: boolean;
  user: User | null;
}

const initialState: StatusState = {
  loggedIn: false,
  user: null,
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
        user: action.payload.user,
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
