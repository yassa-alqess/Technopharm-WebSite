import { Injectable } from '@angular/core';
import { HttpService } from 'core/services';
import { catchError, map, of } from 'rxjs';
import { ProductResponse } from 'core/interfaces';
import { BestSellerItems, HomeBanners } from '../../../../../../assets/mock-data';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends HttpService {

  get banners() {
    return of(HomeBanners);
    // return this.post<any[]>({ APIName: '' }).pipe(map(response => response));
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
