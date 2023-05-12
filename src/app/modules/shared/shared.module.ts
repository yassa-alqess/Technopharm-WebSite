import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseSharedModule } from './sub-modules/base-shared/base-shared.module';

// components - standalone
import { BreadcrumbComponent, CheckboxComponent, MenuComponent, PaginationComponent } from './components';

const STANDALONE_COMPONENTS = [
  PaginationComponent,
  CheckboxComponent,
  MenuComponent,
  BreadcrumbComponent,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BaseSharedModule,

    // Components - standalone
    ...STANDALONE_COMPONENTS
  ],
  exports: [
    // Components - standalone
    ...STANDALONE_COMPONENTS
  ]
})
export class SharedModule { }
