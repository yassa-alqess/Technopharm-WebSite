import { CUSTOM_ELEMENTS_SCHEMA, Component, ContentChild, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Autoplay, Mousewheel, Navigation, Pagination, SwiperOptions } from 'swiper';
import { register } from 'swiper/element';
import { SwiperDirective, SlideDirective } from '../../directives';

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
    modules: [Navigation, Pagination, Mousewheel, Autoplay],
    autoHeight: true,
    mousewheel: true,
    pagination: false,
    navigation: false,
    loop: false,
    loopedSlides: 1,
    spaceBetween: 15,
    allowTouchMove: false,
    speed: 500,
    slidesPerView: "auto",
    centeredSlides: false
  };

  @ContentChild(SlideDirective, { read: TemplateRef }) slideTemplateRef!: TemplateRef<any>;

  ngOnInit(): void {
    this.config = { ...this._config, ...this.config };
    register();
  }
}
