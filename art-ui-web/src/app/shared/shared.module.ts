import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';

import { PhoneMaskDirective } from './directives/phone-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule
  ],
  declarations: [
    PhoneMaskDirective
  ],
  exports: [
    ComponentsModule,
    PhoneMaskDirective
  ]
})
export class SharedModule { }
