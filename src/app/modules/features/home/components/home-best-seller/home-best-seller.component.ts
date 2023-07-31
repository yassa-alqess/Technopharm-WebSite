import { Component, Input, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'core/interfaces';
import { FavoriteService } from 'features/favorite/services/favorite.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'del-home-best-seller',
  templateUrl: './home-best-seller.component.html',
  styleUrls: ['./home-best-seller.component.scss']
})
export class HomeBestSellerComponent {
  private dialog = inject(MatDialog);
  private favoriteService = inject(FavoriteService);

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

  doAction(actionType: string, product: Product) {
    this.product = product;

    if (actionType === 'add-favorite') return this.addToFavorites(product);
    if (actionType === 'remove-favorite') return this.removeToFavorites(product);
    if (actionType === 'modal-view') return this.viewProductAsModal();
    if (actionType === 'add-to-cart') return this.addToCart(product);
  }

  addToFavorites(product: Product) {
    this.favoriteService.add(product, () => {
      product.isFavorite = true;
    });
  }

  removeToFavorites(product: Product) {
    console.log('remove-favorite');
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
