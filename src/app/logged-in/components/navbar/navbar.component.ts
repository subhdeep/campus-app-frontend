import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { User } from 'src/app/models/user';

@Component({
  selector: 'ca-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input()
  public isMobile: boolean;
  @Input()
  public user: User;

  @Output()
  toggle = new EventEmitter();
  @Output()
  logout = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) {}

  url(user: User): SafeStyle {
    const iitkhome = `http://home.iitk.ac.in/~${user.username}/dp`;
    const oaimage = `https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${user.roll}_0.jpg`;
    const url = `url("${iitkhome}"), url("${oaimage}")`;
    return this.sanitizer.bypassSecurityTrustStyle(url);
  }

  onLogout() {
    this.logout.emit();
  }

  onToggle() {
    this.toggle.emit();
  }
}
