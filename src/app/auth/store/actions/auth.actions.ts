import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { LoginCred } from 'src/app/models/login-cred';

export enum AuthActionTypes {
  CheckLogin = '[Auth] Check Login',
  CheckLoginResult = '[Auth] Check Login Result',
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
}

export class CheckLogin implements Action {
  readonly type = AuthActionTypes.CheckLogin;
}

export class CheckLoginResult implements Action {
  readonly type = AuthActionTypes.CheckLoginResult;

  constructor(public result: boolean, public userId?: string) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: LoginCred) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { userId: string }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActionsUnion =
  | CheckLogin
  | CheckLoginResult
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout;
