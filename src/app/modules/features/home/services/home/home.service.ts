import { Injectable } from '@angular/core';
import { HttpService } from 'core/services';
import { catchError, map, of } from 'rxjs';
import { AdvertisementsResponse, OffersResponse, CityResponse, AreaResponse, Product } from 'core/interfaces';
import { BestSellerItems, Advertisements, Offers, Cities, Areas } from '../../../../../../assets/mock-data';
import { StoresResponse } from 'core/interfaces/store/sore';

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
    return this.post<Product[]>({ APIName: 'BestSellerItemsGet', body }).pipe(
      map(response => response),
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
