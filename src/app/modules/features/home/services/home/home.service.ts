import { Injectable, inject } from '@angular/core';
import { AuthService, HttpService } from 'core/services';
import { catchError, map, of } from 'rxjs';
import { AdvertisementsResponse, OffersResponse, CityResponse, AreaResponse, Product, StoresResponse, BestSellerItemsResponse } from 'core/interfaces';
import { BestSellerItems, Advertisements, Offers, Cities, Areas } from '../../../../../../assets/mock-data';
import { FavoriteService } from 'features/favorite/services/favorite.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends HttpService {
  private authService = inject(AuthService);
  private favoriteService = inject(FavoriteService);

  getBanners(body: { id: string; } = { id: 'LOY' }) {
    return this.post<AdvertisementsResponse>({ APIName: 'AdvertisementsGetById', body }).pipe(
      map((response) => response.AdvertisementsGetByIdResult),
      catchError(() => of(Advertisements))
    );
  }

  getBestSellerItems(body: { maxNumberOfItems: number, includeDetails: boolean; } = {
    "maxNumberOfItems": 10,
    "includeDetails": true
  }) {
    return this.post<BestSellerItemsResponse>({ APIName: 'BestSellerItemsGet', body }).pipe(
      map(response => response.BestSellerItemsGetResult),
      catchError(() => {
        return of(BestSellerItems);
      }),
    ).pipe(
      map((products) => {
        products.map(each => {
          each.isFavorite = this.favoriteService.isItemFavorite(each);

          return each;
        });

        return products;
      })
    );;
  }

  getOffers(body: { cardId: string; itemId: string; } = {
    cardId: this.authService.cardId,
    itemId: 'DIS0000239',
  }) {
    return this.post<OffersResponse>({ APIName: 'PublishedOffersGetByCardId', body }).pipe(
      map(response => response.PublishedOffersGetByCardIdResult),
      catchError(() => {
        return of(Offers);
      })
    );
  }

  getCities() {
    return this.post<CityResponse>({ APIName: 'CitiesList' }).pipe(
      map(response => response.CitiesListResult),
      catchError(() => {
        return of(Cities);
      })
    );
  }

  getAreas(body: { City: string; }) {
    return this.post<AreaResponse>({ APIName: 'AreasList', body }).pipe(
      map(response => response.AreasListResult),
      catchError(() => {
        return of(Areas);
      })
    );
  }

  getStores() {
    return this.post<StoresResponse>({ APIName: 'StoresGetAll' }).pipe(
      map(response => response.StoresGetAllResult),
    );
  }
}
