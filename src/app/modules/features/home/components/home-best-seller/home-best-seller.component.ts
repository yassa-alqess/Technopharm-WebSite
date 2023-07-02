import { Component, Input, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'core/interfaces';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'del-home-best-seller',
  templateUrl: './home-best-seller.component.html',
  styleUrls: ['./home-best-seller.component.scss']
})
export class HomeBestSellerComponent {
  private dialog = inject(MatDialog);

  @Input() bestSelerItems: Product[] = [];
  @ViewChild("productDetails") productDetails!: TemplateRef<any>;

  product!: Product;
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

  doAction(action: { type: string; product: Product; }) {
    this.product = action.product;

    if (action.type === 'favorites') return this.addToFavorites(action.product);
    if (action.type === 'modal-view') return this.viewProductAsModal();
    if (action.type === 'add-to-cart') return this.addToCart(action.product);
  }

  addToFavorites(product: Product) {
    console.log('favorites', product);
  }

  viewProductAsModal() {
    this.dialog.open(this.productDetails, {
      autoFocus: false,
      panelClass: ['medium', 'p-0'],
    });
  }

  addToCart(product: Product) {
    console.log('add-to-cart', product);
  }
}
