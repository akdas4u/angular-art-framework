import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { DemoComponent } from './demo.component';
import { DemoRoutes } from './demo.routing';
import { MdModule } from 'app/md/md.module';
import { TablesModule } from 'app/tables/tables.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        MdModule,
        RouterModule.forChild(DemoRoutes),
        TablesModule
    ],
    declarations: [
        DemoComponent
    ]
})

export class DemoModule { }
