import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseSharedModule } from './sub-modules/base-shared/base-shared.module';

// components - standalone
import { BreadcrumbComponent, CheckboxComponent, PaginationComponent, ProductComponent } from './components';

const STANDALONE_COMPONENTS = [
  PaginationComponent,
  CheckboxComponent,
  BreadcrumbComponent,
  ProductComponent
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BaseSharedModule,

    // Components - standalone
    ...STANDALONE_COMPONENTS
  ],
  exports: []
})
export class SharedModule { }
