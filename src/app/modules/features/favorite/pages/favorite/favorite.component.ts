import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product, User } from 'core/interfaces';
import { Favorite } from 'core/interfaces/favorite/favotite';
import { AuthService } from 'core/services';
import { FavoriteService } from 'features/favorite/services/favorite.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'del-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  private authService = inject(AuthService);
  private favoriteService = inject(FavoriteService);
  private dialog = inject(MatDialog);
  private destroy$ = new Subject();

  isEnglish = false;
  favorites: Favorite[] = [];
  user!: User | null;
  product!: Product;
  @ViewChild("productDetails") productDetails!: TemplateRef<any>;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.userDetails$.pipe(takeUntil(this.destroy$)).subscribe(user => this.user = user);
    this.getFavorites();
  }

  getFavorites() {
    console.log(this.user);

    const body = {
      cardId: 'HOCT00638478',
      includeLines: true,
    };

    this.favoriteService.getFavorites(body).subscribe(favorites => {
      this.favorites = favorites.filter(each => each.Item);
      console.log(this.favorites);
    });
  }

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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
