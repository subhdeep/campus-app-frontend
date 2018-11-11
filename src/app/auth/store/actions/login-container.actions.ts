import { Action } from '@ngrx/store';

export enum LoginContainerActionTypes {
  ResetSearch = '[Auth] Reset Search Login Container',
  PerformSearch = '[LoggedIn] Perform Search Login Container',
  FixSearch = '[LoggedIn] Fix Search Login Container',
}

export class ResetSearch implements Action {
  readonly type = LoginContainerActionTypes.ResetSearch;
}

export class PerformSearch implements Action {
  readonly type = LoginContainerActionTypes.PerformSearch;
  constructor(public term: string) {}
}

export class FixSearch implements Action {
  readonly type = LoginContainerActionTypes.FixSearch;
  constructor(public username: string) {}
}

export type LoginContainerActionsUnion =
  | ResetSearch
  | PerformSearch
  | FixSearch;
