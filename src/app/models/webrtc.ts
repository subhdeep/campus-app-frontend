export interface WebRTCMessage {
  toID: string;
  body: any;
  fromID?: string;
}

export interface WebRTCBusyMessage {
  toID: string;
}

export interface WebRTCInitMessage {
  to: string;
  from?: string;
  fromID?: string;
}

export interface WebRTCAckMessage {
  toID: string;
  from?: string;
  fromID?: string;
}

export type WebRTCMessagesUnion =
  | WebRTCMessage
  | WebRTCAckMessage
  | WebRTCBusyMessage
  | WebRTCInitMessage;
