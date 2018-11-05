import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';

import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { User } from 'src/app/models/user';
import { State } from 'src/app/core/store';
import { selectFilteredStudents } from '../../store/selectors/chat-wrapper.selector';
import {
  PerformSearch,
  ResetSearch,
} from '../../store/actions/chat-wrapper.actions';

@Component({
  templateUrl: './chat-wrapper.container.html',
  styleUrls: ['./chat-wrapper.container.scss'],
})
export class ChatWrapperContainer implements OnInit {
  private _valueSubscription: Subscription;
  public searchResults$: Observable<User[]>;
  public searchCtrl = new FormControl();

  constructor(private sanitizer: DomSanitizer, private store: Store<State>) {}

  ngOnInit() {
    this.searchResults$ = this.store.pipe(select(selectFilteredStudents));
    const typeahead = this.searchCtrl.valueChanges.pipe(
      map((v: string) => v.trim()),
      filter(v => v.length > 0),
      debounceTime(20),
      distinctUntilChanged()
    );
    this._valueSubscription = typeahead
      .pipe(tap(v => this.store.dispatch(new PerformSearch(v))))
      .subscribe();
  }

  ngOnDestroy() {
    if (this._valueSubscription) {
      this._valueSubscription.unsubscribe();
    }
    this.store.dispatch(new ResetSearch());
  }

  url(user: User): SafeStyle {
    const iitkhome = `http://home.iitk.ac.in/~${user.username}/dp`;
    const oaimage = `https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${user.roll}_0.jpg`;
    const url = `url("${iitkhome}"), url("${oaimage}")`;
    return this.sanitizer.bypassSecurityTrustStyle(url);
  }

  selected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
  }
}
