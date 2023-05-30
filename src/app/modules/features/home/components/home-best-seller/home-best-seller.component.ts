import { Component, Input } from '@angular/core';
import { Product } from 'core/interfaces';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'del-home-best-seller',
  templateUrl: './home-best-seller.component.html',
  styleUrls: ['./home-best-seller.component.scss']
})
export class HomeBestSellerComponent {
  @Input() bestSelerItems: Product[] = [];

  config: SwiperOptions = {
    loop: true,
    spaceBetween: 1,
    slidesPerView: 1,
    pagination: false,
    mousewheel: false,
    allowTouchMove: true,
    navigation: {
      nextEl: ".best-seller-content .swiper-next",
      prevEl: ".best-seller-content .swiper-prev",
      lockClass: 'd-none'
    },
    breakpoints: {
      992: {
        slidesPerView: 5,
        spaceBetween: 15,
        centeredSlides: false,
        allowTouchMove: false,
      },
      685: {
        slidesPerView: 3,
        spaceBetween: 15,
        centeredSlides: false,
        allowTouchMove: false,
      },
    }
  };

  doAction(action: { type: string; productId: string; }) {
    if (action.type === 'favorites') return this.addToFavorites(action.productId);
    if (action.type === 'modal-view') return this.viewProductAsModal(action.productId);
    if (action.type === 'add-to-cart') return this.addToCart(action.productId);
  }

  addToFavorites(productId: string) {
    console.log('favorites', productId);
  }

  viewProductAsModal(productId: string) {
    console.log('modal-view', productId);
  }

  addToCart(productId: string) {
    console.log('add-to-cart', productId);
  }
}
