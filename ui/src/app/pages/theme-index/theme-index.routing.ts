import { RouterModule, Route } from '@angular/router';
import { ThemeIndexComponent } from './theme-index.component';

export const routes: Route[] = [
  {
    path: '',
    component: ThemeIndexComponent
  }
];

export default RouterModule.forChild(routes);
