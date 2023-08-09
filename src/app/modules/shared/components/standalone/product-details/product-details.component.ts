import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'core/interfaces';
import { SwiperOptions } from 'swiper';
import { TitleComponent } from '../title/title.component';
import { ButtonComponent } from '../button/button.component';
import { DirectivesModule } from 'shared/sub-modules/directives/directives.module';
import { SwiperModule } from 'shared/sub-modules/swiper/swiper.module';
import { TranslateModule } from '@ngx-translate/core';
import { FavoriteService } from 'features/favorite/services/favorite.service';

@Component({
  selector: 'del-product-details',
  standalone: true,
  imports: [CommonModule, TitleComponent, ButtonComponent, DirectivesModule, SwiperModule, TranslateModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  private favoriteService = inject(FavoriteService);

  @Input() isModalView = false;
  @Input() product!: Product;

  private config: SwiperOptions = {
    loop: true,
    spaceBetween: 1,
    slidesPerView: 1,
    navigation: false,
    mousewheel: false,
    allowTouchMove: true,
    watchSlidesProgress: true,
    autoHeight: false,
  };

  isEnglish = false;
  count = 1;

  productImageConfig!: SwiperOptions;
  thumbnailSwiperConfig: SwiperOptions = {
    ...this.config,
    direction: "vertical",
    slidesPerView: 5,
    spaceBetween: 15,
    on: {
      init: (swiper) => {
        setTimeout(() => {
          this.productImageConfig = {
            ...this.config,
            direction: 'horizontal',
            spaceBetween: 0,
            thumbs: {
              swiper,
            }
          };
        });
      },
    }
  };

  addToCart() {
    console.log('add-to-cart');
  }

  addToFavourites() {
    this.favoriteService.add(this.product, () => {
      this.product.isFavorite = true;
    });
  }

  removeFromFavourites() {
    this.favoriteService.remove(this.product, () => {
      this.product.isFavorite = false;
    });
  }

  formatNumber(number: number) {
    return new Intl.NumberFormat(`${this.isEnglish ? 'en' : 'ar'}-EG`, { style: 'currency', currency: 'EGP' }).format(number);
  }

  plus() {
    this.count += 1;
  }

  minus() {
    if (this.count === 0) return;

    this.count -= 1;
  }
}
