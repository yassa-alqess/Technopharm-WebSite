import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperComponent } from './components/swiper/swiper.component';
import { SlideDirective } from './directives/slide/slide.directive';

@NgModule({
  declarations: [SlideDirective],
  imports: [
    CommonModule,
    SwiperComponent,
  ],
  exports: [SwiperComponent, SlideDirective]
})
export class SwiperModule { }
