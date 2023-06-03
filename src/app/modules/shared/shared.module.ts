import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseSharedModule } from './sub-modules/base-shared';

// components - standalone
import { BreadcrumbComponent, ProductComponent, SubTitleComponent, TitleComponent } from './components';

// modules
import { DirectivesModule } from './sub-modules/directives/directives.module';
import { MenuModule } from './sub-modules/menu/menu.module';
import { SwiperModule } from './sub-modules/swiper/swiper.module';

const STANDALONE_COMPONENTS = [
  BreadcrumbComponent,
  ProductComponent,
  TitleComponent,
  SubTitleComponent,
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
