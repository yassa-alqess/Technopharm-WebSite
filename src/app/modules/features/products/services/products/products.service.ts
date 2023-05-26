import { Injectable } from '@angular/core';
import { ProductsPayload, ProductsResponse } from 'core/interfaces';
import { HttpService } from 'core/services';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends HttpService {
  getProducts(body: Partial<ProductsPayload>) {
    return this.post<ProductsResponse>({ APIName: 'ItemsPage', body }).pipe(map(response => response.ItemsPageResult));
  }
}
