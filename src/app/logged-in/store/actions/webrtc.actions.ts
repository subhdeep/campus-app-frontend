import { Action } from '@ngrx/store';
import {
  WebRTCInitMessage,
  WebRTCAckMessage,
  WebRTCMessage,
} from 'src/app/models/webrtc';

export enum WebRTCActionTypes {
  AcceptCall = '[LoggedIn] Accept Calling',
  BeginCall = '[LoggedIn] Begin Calling',
  CancelCall = '[LoggedIn] Cancel Call',
  InCallEnded = '[LoggedIn] In Call Ended',
  InCallStarted = '[LoggedIn] In Call Started',
  ReceivingCall = '[LoggedIn] Receiving Calling',
  ReceivedCall = '[LoggedIn] Received Call',
  ReceivedWebRTC = '[LoggedIn] Received WebRTC Message',
  SendWebRTC = '[LoggedIn] Send WebRTC Message',
}

export class AcceptCall implements Action {
  readonly type = WebRTCActionTypes.AcceptCall;
  constructor(public payload: string) {}
}

export class BeginCall implements Action {
  readonly type = WebRTCActionTypes.BeginCall;
  constructor(public username: string) {}
}

export class CancelCall implements Action {
  readonly type = WebRTCActionTypes.CancelCall;
  constructor(public username: string) {}
}

export class ReceivingCall implements Action {
  readonly type = WebRTCActionTypes.ReceivingCall;
  constructor(public payload: WebRTCInitMessage) {}
}

export class ReceivedCall implements Action {
  readonly type = WebRTCActionTypes.ReceivedCall;
  constructor(public payload: WebRTCAckMessage) {}
}

export class InCallEnded implements Action {
  readonly type = WebRTCActionTypes.InCallEnded;
}

export class InCallStarted implements Action {
  readonly type = WebRTCActionTypes.InCallStarted;
}

export class ReceivedWebRTC implements Action {
  readonly type = WebRTCActionTypes.ReceivedWebRTC;
  constructor(public payload: WebRTCMessage) {}
}

export class SendWebRTC implements Action {
  readonly type = WebRTCActionTypes.SendWebRTC;
  constructor(public payload: any, public toID: string) {}
}

export type WebRTCActionsUnion =
  | AcceptCall
  | BeginCall
  | InCallEnded
  | InCallStarted
  | ReceivedCall
  | ReceivingCall
  | ReceivedWebRTC
  | SendWebRTC;
