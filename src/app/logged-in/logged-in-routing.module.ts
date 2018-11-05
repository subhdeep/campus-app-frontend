import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatWrapperContainer, LoggedInWrapperContainer } from './containers';

export const routes: Routes = [
  {
    path: '',
    component: LoggedInWrapperContainer,
    children: [
      { path: '', redirectTo: 'chat', pathMatch: 'full' },
      { path: 'chat', component: ChatWrapperContainer },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedInRoutingModule {}
