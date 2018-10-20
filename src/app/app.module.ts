import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { ROUTES } from './app.routing';
import { AppComponent } from './app.component';
import { components } from './components';
import { containers } from './containers';
import { effects, metaReducers, reducers } from './store';

@NgModule({
  declarations: [AppComponent, ...components, ...containers],
  imports: [
    // Core Angular Stuff
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    RouterModule.forRoot(ROUTES, {
      enableTracing: !environment.production,
    }),
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,

    // Angular Material Stuff
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,

    // NgRx stuff
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
