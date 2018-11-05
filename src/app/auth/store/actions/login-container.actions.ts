import { Action } from '@ngrx/store';

export enum LoginContainerActionTypes {
  ResetSearch = '[Auth] Reset Search Login Container',
  PerformSearch = '[LoggedIn] Perform Search Login Container',
}

export class ResetSearch implements Action {
  readonly type = LoginContainerActionTypes.ResetSearch;
}

export class PerformSearch implements Action {
  readonly type = LoginContainerActionTypes.PerformSearch;
  constructor(public term: string) {}
}

export type LoginContainerActionsUnion = ResetSearch | PerformSearch;
