import { Injectable, inject } from '@angular/core';
import { ProductPayload, ProductResponse, ProductsPayload, ProductsResponse } from 'core/interfaces';
import { Products } from '../../../../../../assets/mock-data';
import { HttpService } from 'core/services';
import { catchError, map, of } from 'rxjs';
import { FavoriteService } from 'features/favorite/services/favorite.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends HttpService {
  private favoriteService = inject(FavoriteService);

  getProducts(body: Partial<ProductsPayload>) {
    return this.post<ProductsResponse>({ APIName: 'ItemsPage', body }).pipe(
      map((response) => response.ItemsPageResult),
      catchError(() => of(Products))
    ).pipe(
      map((products) => {
        products.map(each => {
          each.isFavorite = this.favoriteService.isItemFavorite(each);

          return each;
        });

        return products;
      })
    );
  }

  getProduct(body: Partial<ProductPayload>) {
    return this.post<ProductResponse>({ APIName: 'ItemGetById', body }).pipe(
      map((response) => response.ItemGetByIdResult),
    ).pipe(
      map((product) => {
        product.isFavorite = this.favoriteService.isItemFavorite(product);
        return product;
      })
    );
  }
}
