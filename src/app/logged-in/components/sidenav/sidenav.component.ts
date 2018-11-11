import { Component, Input } from '@angular/core';
import { ChatPreviewViewModel } from 'src/app/models/chat-preview';

@Component({
  selector: 'ca-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input()
  chatPreviews: ChatPreviewViewModel[];
}
