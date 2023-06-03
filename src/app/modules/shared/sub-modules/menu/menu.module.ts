import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { BaseSharedModule } from '../base-shared';
import { MenuComponent, MenuItemComponent } from './components';

const MATERIAL_MODULES = [
  MatMenuModule,
  MatButtonModule,
];

const COMPONENTS = [
  MenuComponent,
  MenuItemComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    BaseSharedModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class MenuModule { }
