import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { UnidadeMedidaComponent } from './unidade-medida/unidade-medida.component';
import { UnidadeMedidaListComponent } from './unidade-medida-list/unidade-medida-list.component';
import { UnidadeMedidaService } from './shared/unidade-medida.service';
import { UnidadesMedidaRoutes } from './unidades-medida.routing';
import { TablesModule } from 'art-ui-kit';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UnidadesMedidaRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        TablesModule
    ],
    declarations: [
        UnidadeMedidaListComponent,
        UnidadeMedidaComponent
    ],
    exports: [],
    providers: [
        UnidadeMedidaService
    ]
})
export class UnidadesMedidaModule { }
