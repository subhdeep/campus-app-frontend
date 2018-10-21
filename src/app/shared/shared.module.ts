import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material';

@NgModule({
  exports: [CommonModule, MaterialModule, RouterModule, FlexLayoutModule],
})
export class SharedModule {}
