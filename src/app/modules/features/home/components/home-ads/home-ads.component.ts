import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AdvertisementsAppTypes } from 'core/enums';
import { Advertisement } from 'core/interfaces';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'del-home-ads',
  templateUrl: './home-ads.component.html',
  styleUrls: ['./home-ads.component.scss']
})
export class HomeAdsComponent {
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
