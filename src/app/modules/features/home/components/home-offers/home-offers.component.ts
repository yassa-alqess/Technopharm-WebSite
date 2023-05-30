import { Component, Input } from '@angular/core';
import { Offer } from 'core/interfaces';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'del-home-offers',
  templateUrl: './home-offers.component.html',
  styleUrls: ['./home-offers.component.scss']
})
export class HomeOffersComponent {
  isEnglish = false;
  offersSliced: Offer[] = [];

  config: SwiperOptions = {
    loop: true,
    spaceBetween: 1,
    slidesPerView: 1,
    pagination: false,
    allowTouchMove: true,
    mousewheel: false,
    navigation: {
      nextEl: ".offers-content .swiper-next",
      prevEl: ".offers-content .swiper-prev",
      lockClass: 'd-none'
    },
  };

  @Input() offers: Offer[] = [];

  get sliceEndCount() {
    return this.isLargeScreen ? 6 : this.isMediumScreen ? 4 : 8;
  }

  private get isLargeScreen() {
    return innerWidth >= 992 && innerWidth < 1200;
  }

  private get isMediumScreen() {
    return innerWidth >= 576 && innerWidth < 992;
  }
}
