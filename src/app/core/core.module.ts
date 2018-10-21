import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { containers } from './containers';

@NgModule({
  imports: [SharedModule],
  declarations: [...containers],
  exports: [...containers],
})
export class CoreModule {}
