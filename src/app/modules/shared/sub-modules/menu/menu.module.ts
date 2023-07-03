import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

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
    RouterModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class MenuModule { }
