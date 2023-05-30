import { Injectable } from '@angular/core';
import { HttpService } from 'core/services';
import { catchError, map, of } from 'rxjs';
import { AdvertisementsResponse, ProductResponse } from 'core/interfaces';
import { BestSellerItems, Advertisements } from '../../../../../../assets/mock-data';

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
}
