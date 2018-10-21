import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { containers } from './containers';
import { effects, reducers } from './store';
import { SharedModule } from '../shared';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ChatRoutingModule,
    StoreModule.forFeature('chat', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [...containers],
})
export class ChatModule {}
