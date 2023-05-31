import { Injectable } from '@angular/core';
import { HttpService } from 'core/services';
import { catchError, map, of } from 'rxjs';
import { AdvertisementsResponse, ProductResponse, OffersResponse } from 'core/interfaces';
import { BestSellerItems, Advertisements, Offers } from '../../../../../../assets/mock-data';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends HttpService {

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
    return this.post<ProductResponse>({ APIName: 'BestSellerItemsGet', body }).pipe(
      map(response => response.BestSellerItemsGetResult),
      catchError(() => {
        return of(BestSellerItems);
      }),
    );
  }

  getOffers(body: { cardId: string; itemId: string; } = {
    cardId: 'HOCT00555812',
    itemId: 'DIS0000239',
  }) {
    return this.post<OffersResponse>({ APIName: 'PublishedOffersGetByCardId', body }).pipe(
      map(response => response.PublishedOffersGetByCardIdResult),
      catchError(() => {
        return of(Offers);
      })
    );
  }
}
