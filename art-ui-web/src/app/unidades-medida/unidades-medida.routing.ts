import { Routes } from '@angular/router';

import { UnidadeMedidaListComponent } from './unidade-medida-list/unidade-medida-list.component';
import { UnidadeMedidaComponent } from './unidade-medida/unidade-medida.component';

export const UnidadesMedidaRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: UnidadeMedidaListComponent,
            },
            {
                path: 'create',
                component: UnidadeMedidaComponent
            },
            {
                path: 'edit/:id',
                component: UnidadeMedidaComponent
            }
        ]
    }
];
