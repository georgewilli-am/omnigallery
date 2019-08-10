import { RouterModule, Route } from '@angular/router';
import { ProfileComponent } from './profile.component';

export const routes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: ''
      },
      {
        path: 'settings'
      }
    ]
  }
];

export default RouterModule.forChild(routes);
