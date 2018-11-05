import { NgModule } from '@angular/core';

import { TextFieldModule } from '@angular/cdk/text-field';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

const modules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  TextFieldModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
