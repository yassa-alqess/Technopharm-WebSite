import { CUSTOM_ELEMENTS_SCHEMA, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper, { A11y, Mousewheel, Navigation, Pagination, SwiperOptions } from 'swiper';
import { register } from 'swiper/element';
import { SwiperDirective } from '../../directives/swiper/swiper.directive';
import { SlideDirective } from '../../directives/slide/slide.directive';

@Component({
  selector: 'swiper',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, SwiperDirective],
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperComponent implements OnInit {

  @Input() slides: any[] = [];
  @Input() config!: SwiperOptions;
  @Input() class!: string;

  private _config: SwiperOptions = {
    modules: [Navigation, Pagination, A11y, Mousewheel],
    pagination: { clickable: true, dynamicBullets: true },
    autoHeight: true,
    spaceBetween: 20,
    navigation: true,
    mousewheel: true,
    loop: false,
    slidesPerView: "auto",
    centeredSlides: true
  };

  @ContentChild(SlideDirective, { read: TemplateRef }) slideTemplateRef!: TemplateRef<any>;

  ngOnInit(): void {
    this.config = { ...this._config, ...this.config };
    register();
  }
}
