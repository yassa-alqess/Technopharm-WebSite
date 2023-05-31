import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseSharedModule } from './sub-modules/base-shared/base-shared.module';

// components - standalone
import { BreadcrumbComponent, CheckboxComponent, PaginationComponent, ProductComponent } from './components';

// modules
import { DirectivesModule } from './sub-modules/directives/directives.module';
import { MenuModule } from './sub-modules/menu/menu.module';
import { SwiperModule } from './sub-modules/swiper/swiper.module';

const STANDALONE_COMPONENTS = [
  PaginationComponent,
  CheckboxComponent,
  BreadcrumbComponent,
  ProductComponent
];

const MODULES = [
  BaseSharedModule,
  DirectivesModule,
  MenuModule,
  SwiperModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // Modules
    ...MODULES,

    // Components - standalone
    ...STANDALONE_COMPONENTS
  ],
  exports: []
})
export class SharedModule { }
