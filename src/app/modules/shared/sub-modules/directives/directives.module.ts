import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IsEnglishDirective } from './is-english/is-english.directive';
import { RtlDirective } from './rtl/rtl.directive';

const DIRECTIVES = [
  IsEnglishDirective,
  RtlDirective,
];

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [CommonModule],
  exports: [...DIRECTIVES]
})
export class DirectivesModule { }
