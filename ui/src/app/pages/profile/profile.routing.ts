import { RouterModule, Route } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { UploadComponent } from './upload/upload.component';

export const routes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: UploadComponent
      },
      {
        path: 'settings'
      }
    ]
  }
];

export default RouterModule.forChild(routes);
