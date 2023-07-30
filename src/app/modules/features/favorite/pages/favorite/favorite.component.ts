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

  doAction(action: { type: string; product: Product; }) {
    this.product = action.product;

    if (action.type === 'favorites') return this.addToFavorites(action.product);
    if (action.type === 'modal-view') return this.viewProductAsModal();
    if (action.type === 'add-to-cart') return this.addToCart(action.product);
  }

  addToFavorites(product: Product) {
    this.favoriteService.add(product);
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
