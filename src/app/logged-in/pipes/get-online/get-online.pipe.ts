import { Pipe, PipeTransform } from '@angular/core';

import { Observable } from 'rxjs';

import { ChatService } from '../../services/chat.service';

@Pipe({
  name: 'getOnline',
})
export class GetOnlinePipe implements PipeTransform {
  constructor(private chat: ChatService) {}

  transform(value: any, args?: any): Observable<boolean> {
    return this.chat.getOnline(value);
  }
}
