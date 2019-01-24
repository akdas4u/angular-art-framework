import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneMaskDirective } from './directives/phone-mask.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PhoneMaskDirective
  ],
  exports: [
    PhoneMaskDirective
  ]
})
export class SharedModule { }
