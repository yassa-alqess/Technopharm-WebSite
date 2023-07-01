import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Forms Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Angular Router Mpdule
import { RouterModule } from '@angular/router';
// Translate Module
import { TranslateModule } from '@ngx-translate/core';
// Directives
import { DirectivesModule } from '../directives/directives.module';
// SwiperModule
import { SwiperModule } from '../swiper/swiper.module';
// MenuModule
import { MenuModule } from '../menu/menu.module';

const MODULES = [
  DirectivesModule,
  SwiperModule,
  MenuModule,

  FormsModule,
  RouterModule,
  ReactiveFormsModule,
  TranslateModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: MODULES
})
export class BaseSharedModule { }
