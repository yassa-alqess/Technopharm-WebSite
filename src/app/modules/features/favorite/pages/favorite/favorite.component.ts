import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'core/interfaces';
import { FavoriteService } from 'features/favorite/services/favorite.service';

@Component({
  selector: 'del-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  private favoriteService = inject(FavoriteService);
  private dialog = inject(MatDialog);

  isEnglish = false;
  product!: Product;
  favorites = this.favoriteService.favorites$;

  @ViewChild("productDetails") productDetails!: TemplateRef<any>;

  doAction(actionType: string, product: Product | undefined) {
    if (!product) return;

    this.product = product;

    if (actionType === 'remove-favorite') return this.removeToFavorites(product);
    if (actionType === 'modal-view') return this.viewProductAsModal();
    if (actionType === 'add-to-cart') return this.addToCart(product);
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
