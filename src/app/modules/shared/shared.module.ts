import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components - standalone
import * as STANDALONE_COMPONENTS from './components';

// modules
import { BaseSharedModule } from './sub-modules/base-shared';

const MODULES = [
  BaseSharedModule,
];

const Standalone_Components = [
  STANDALONE_COMPONENTS.BreadcrumbComponent,
  STANDALONE_COMPONENTS.CategoryComponent,
  STANDALONE_COMPONENTS.ProductComponent,
  STANDALONE_COMPONENTS.TitleComponent,
  STANDALONE_COMPONENTS.SubTitleComponent,
  STANDALONE_COMPONENTS.AccountInfoFormComponent,
  STANDALONE_COMPONENTS.AccountAddressFormComponent,

  STANDALONE_COMPONENTS.InputTextComponent,
  STANDALONE_COMPONENTS.DatepickerComponent,
  STANDALONE_COMPONENTS.DropdownComponent,
  STANDALONE_COMPONENTS.RadioButtonComponent,
] 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // Modules
    ...MODULES,

    // Components - standalone
    ...Standalone_Components,
  ],
  exports: [
    // Modules
    ...MODULES,

    // Components - standalone
    ...Standalone_Components,
  ]
})
export class SharedModule { }
