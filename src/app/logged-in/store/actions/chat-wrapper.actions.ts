import { Action } from '@ngrx/store';

export enum ChatWrapperActionTypes {
  ResetSearch = '[LoggedIn] Reset Search',
  PerformSearch = '[LoggedIn] Perform Search',
}

export class ResetSearch implements Action {
  readonly type = ChatWrapperActionTypes.ResetSearch;
}

export class PerformSearch implements Action {
  readonly type = ChatWrapperActionTypes.PerformSearch;
  constructor(public term: string) {}
}

export type ChatWrapperActionsUnion = ResetSearch | PerformSearch;
