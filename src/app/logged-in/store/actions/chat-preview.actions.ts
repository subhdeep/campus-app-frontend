import { Action } from '@ngrx/store';
import { ChatPreview } from 'src/app/models/chat-preview';

export enum ChatPreviewActionTypes {
  GetPreviews = '[LoggedIn] Get Previews',
  GetPreviewsSuccess = '[LoggedIn] Get Previews Success',
  GetPreviewsFail = '[LoggedIn] Get Previews Fail',
}

export class GetPreviews implements Action {
  readonly type = ChatPreviewActionTypes.GetPreviews;
}

export class GetPreviewsSuccess implements Action {
  readonly type = ChatPreviewActionTypes.GetPreviewsSuccess;
  constructor(public payload: ChatPreview[]) {}
}

export class GetPreviewsFail implements Action {
  readonly type = ChatPreviewActionTypes.GetPreviewsFail;
  constructor(public err: any) {}
}

export type ChatPreviewActionsUnion =
  | GetPreviews
  | GetPreviewsSuccess
  | GetPreviewsFail;
