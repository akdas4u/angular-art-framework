import { Routes } from '@angular/router';

import { DemoComponent } from './demo.component';

export const DemoRoutes: Routes = [
  {

    path: '',
    children: [{
      path: 'demo',
      component: DemoComponent
    }]
  }
];
