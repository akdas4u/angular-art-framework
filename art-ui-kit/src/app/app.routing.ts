import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'demo',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './demo/demo.module#DemoModule'
            }, {
                path: 'tables',
                loadChildren: './tables/tables.module#TablesModule'
            }
        ]
    }
];
