import { Component, Input } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

import { ChatPreviewViewModel } from 'src/app/models/chat-preview';
import { User } from 'src/app/models/user';

@Component({
  selector: 'ca-chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrls: ['./chat-preview.component.scss'],
})
export class ChatPreviewComponent {
  @Input()
  chat: ChatPreviewViewModel;

  constructor(private sanitizer: DomSanitizer) {}

  get url(): SafeStyle {
    const user = this.chat.user;
    const iitkhome = `http://home.iitk.ac.in/~${user.username}/dp`;
    const oaimage = `https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${user.roll}_0.jpg`;
    const url = `url("${iitkhome}"), url("${oaimage}")`;
    return this.sanitizer.bypassSecurityTrustStyle(url);
  }
}
