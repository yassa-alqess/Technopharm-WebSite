import { Component, Input } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'del-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  config: SwiperOptions = {
    mousewheel: false,
    loop: true,
    autoplay: true,
  };

  @Input() slides: string[] = [];
}
