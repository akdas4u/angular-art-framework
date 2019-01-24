import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardTableComponent } from './card-table/card-table.component';
import { DefaultTableComponent } from './default-table/default-table.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        CardTableComponent,
        DefaultTableComponent
    ],
    exports: [
        CardTableComponent,
        DefaultTableComponent
    ]
})
export class TablesModule {
}
