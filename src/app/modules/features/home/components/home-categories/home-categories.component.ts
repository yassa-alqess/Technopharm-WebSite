import { Component, Input } from '@angular/core';
import { Category } from 'core/interfaces';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'del-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.scss']
})
export class HomeCategoriesComponent {
  @Input() categories: Category[] = [];

  isEnglish = false;

  config: SwiperOptions = {
    loop: true,
    spaceBetween: 15,
    slidesPerView: 1,
    pagination: false,
    allowTouchMove: true,
    mousewheel: false,
    navigation: {
      nextEl: ".categories-wrapper .swiper-next",
      prevEl: ".categories-wrapper .swiper-prev",
      lockClass: 'd-none'
    },
    breakpoints: {
      992: {
        slidesPerView: 5,
        centeredSlides: false,
        allowTouchMove: false,
      },
      685: {
        slidesPerView: 3,
        centeredSlides: false,
        allowTouchMove: false,
      },
    }
  };
}
