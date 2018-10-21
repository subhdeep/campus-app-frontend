import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreModule } from './core/core.module';
import { NotFoundContainer } from './core/containers';

import { AuthGuard } from './auth/services/auth-guard.service';

import { environment } from '../environments/environment';

export const routes: Routes = [
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  {
    path: 'chat',
    loadChildren: './chat/chat.module#ChatModule',
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundContainer },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: !environment.production,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
