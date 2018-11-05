import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
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
import { State, selectFilteredStudents } from '../../store';
import { Login } from '../../store/actions/auth.actions';
import {
  PerformSearch,
  ResetSearch,
} from '../../store/actions/login-container.actions';

@Component({
  templateUrl: './login.container.html',
  styleUrls: ['./login.container.scss'],
})
export class LoginContainer implements OnDestroy, OnInit {
  private _valueSubscription: Subscription;
  public searchResults$: Observable<User[]>;

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  public selectedUsername = false;

  @ViewChild('username')
  usernameInput: ElementRef<HTMLInputElement>;
  @ViewChild('password')
  passwordInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.searchResults$ = this.store.pipe(select(selectFilteredStudents));
    const typeahead = this.loginForm.controls['username'].valueChanges.pipe(
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
    this.selectedUsername = true;
    this.passwordInput.nativeElement.focus();
  }

  clearSelection() {
    this.selectedUsername = false;
    this.loginForm.controls['username'].setValue('');
    this.store.dispatch(new ResetSearch());
    this.usernameInput.nativeElement.focus();
  }

  onSubmit() {
    this.store.dispatch(new Login(this.loginForm.value));
  }
}
