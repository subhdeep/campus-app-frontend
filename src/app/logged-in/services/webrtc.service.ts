import { Injectable } from '@angular/core';

import { Observable, interval, merge, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

const servers = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};

@Injectable()
export class WebRTCService {}
