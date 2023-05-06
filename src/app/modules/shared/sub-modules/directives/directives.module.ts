import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IsEnglishDirective, RtlDirective } from '.';

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
