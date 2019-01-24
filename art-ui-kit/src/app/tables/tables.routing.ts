import { Routes } from '@angular/router';

import { DefaultTableComponent } from './default-table/default-table.component';
import { CardTableComponent } from './card-table/card-table.component';

export const TablesRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: DefaultTableComponent
            },
            {
                path: 'default-table',
                component: DefaultTableComponent
            },
            {
                path: 'card-table',
                component: CardTableComponent
            }
        ]
    }
];
