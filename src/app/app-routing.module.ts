import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCallbackComponent } from './services/auth/auth-callback/auth-callback.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/theme-index/theme-index.module').then(
        m => m.ThemeIndexModule
      )
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'callback',
    component: AuthCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
