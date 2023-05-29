import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AdvertisementsAppTypes } from 'core/enums';
import { Advertisement } from 'core/interfaces';
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
    allowTouchMove: true,
  };

  @Input() slides: Advertisement[] = [];

  @ViewChild("bannerAnchor") BannerAnchor!: ElementRef<HTMLAnchorElement>;

  getHref(silder: Advertisement) {
    let href = '';

    switch (silder.AppType) {
      case AdvertisementsAppTypes.magazine:
        href = silder.AppValue;
        if (this.BannerAnchor && !this.BannerAnchor.nativeElement.hasAttribute('target')) {
          this.BannerAnchor?.nativeElement.setAttribute('target', '_blank');
          this.BannerAnchor?.nativeElement.setAttribute('href', href);
        }

        break;
      default:
        break;
    }

    return href;
  }
}
