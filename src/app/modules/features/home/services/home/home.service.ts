import { Injectable } from '@angular/core';
import { HttpService } from 'core/services';
import { catchError, map, of } from 'rxjs';
import { AdvertisementsResponse, ProductResponse } from 'core/interfaces';
import { BestSellerItems, Advertisements } from '../../../../../../assets/mock-data';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends HttpService {

  get banners() {
    return this.post<AdvertisementsResponse>({ APIName: 'AdvertisementsGetById' }).pipe(
      map((response) => response.AdvertisementsGetByIdResult),
      catchError(() => of(Advertisements))
    );
  }

  get bestSellerItems() {
    return this.post<ProductResponse>({ APIName: 'BestSellerItemsGet' }).pipe(
      map(response => response.BestSellerItemsGetResult),
      catchError(() => {
        return of(BestSellerItems);
      }),
    );
  }
}
