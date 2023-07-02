import { Injectable } from '@angular/core';
import { ProductPayload, ProductResponse, ProductsPayload, ProductsResponse } from 'core/interfaces';
import { Products } from '../../../../../../assets/mock-data';
import { HttpService } from 'core/services';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends HttpService {
  getProducts(body: Partial<ProductsPayload>) {
    return this.post<ProductsResponse>({ APIName: 'ItemsPage', body }).pipe(
      map((response) => response.ItemsPageResult),
      catchError(() => of(Products))
    );
  }

  getProduct(body: Partial<ProductPayload>) {
    return this.post<ProductResponse>({ APIName: 'ItemGetById', body }).pipe(
      map((response) => response.ItemGetByIdResult),
    );
  }
}
