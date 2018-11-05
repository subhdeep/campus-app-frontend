import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';
import { LoggedInRoutingModule } from './logged-in-routing.module';

import { containers } from './containers';
import { effects, reducers } from './store';
import { services } from './services';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    LoggedInRoutingModule,
    StoreModule.forFeature('loggedIn', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [...containers],
  providers: [...services],
})
export class LoggedInModule {}
