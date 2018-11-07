import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatWrapperContainer, LoggedInWrapperContainer } from './containers';

export const routes: Routes = [
  {
    path: '',
    component: LoggedInWrapperContainer,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: ChatWrapperContainer },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedInRoutingModule {}
