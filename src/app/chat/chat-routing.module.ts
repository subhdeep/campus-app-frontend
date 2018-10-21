import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatWrapperContainer } from './containers';

export const routes: Routes = [{ path: '', component: ChatWrapperContainer }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
