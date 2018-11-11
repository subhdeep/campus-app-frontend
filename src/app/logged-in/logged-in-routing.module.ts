import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ChatContainer,
  ChatWrapperContainer,
  LoggedInWrapperContainer,
} from './containers';

export const routes: Routes = [
  {
    path: '',
    component: LoggedInWrapperContainer,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: ChatWrapperContainer },
      { path: ':userId', component: ChatContainer },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedInRoutingModule {}
