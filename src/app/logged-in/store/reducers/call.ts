import {
  WebRTCActionsUnion,
  WebRTCActionTypes,
} from '../actions/webrtc.actions';

export interface CallState {
  inCall: boolean;
}

const initialState: CallState = {
  inCall: false,
};

export function callReducer(
  state: CallState = initialState,
  action: WebRTCActionsUnion
): CallState {
  switch (action.type) {
    case WebRTCActionTypes.InCallEnded:
      return { inCall: false };
    case WebRTCActionTypes.InCallStarted:
      return { inCall: true };
    default:
      return state;
  }
}
