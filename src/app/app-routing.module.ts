import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreModule } from './core/core.module';
import { NotFoundContainer } from './core/containers';

import { AuthGuard } from './auth/services/auth-guard.service';

import { environment } from '../environments/environment';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './logged-in/logged-in.module#LoggedInModule',
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundContainer },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
