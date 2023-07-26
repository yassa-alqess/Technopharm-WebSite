import { Injectable } from '@angular/core';
import { HttpService } from 'core/services';
import { FavoriteResponse } from 'core/interfaces/favorite/favotite';
import { map } from 'rxjs';
import { ListType } from 'core/enums/list-type/list-type';
import { Product } from 'core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends HttpService {

  getFavorites(body: { cardId: string, includeLines: boolean, listType?: ListType; }) {
    body.listType = ListType.Wish;

    return this.post<FavoriteResponse>({ APIName: 'OneListGetByCardId', body }).pipe(
      map(response => {
        response.OneListGetByCardIdResult.forEach(each => {
          const product = each.Items[0];
          if (each.Items.length) {
            each.Item = {
              Id: product.ItemId,
              Description: product.ItemDescription,
              Images: [product.Image],
              ItemPrice: product.Price,
              ItemCategoryCode: product.ItemCategoryCode,
              ProductGroupId: product.ProductGroupId,
              AllowedToSell: true,
            } as Product;
          }

          return each;
        });

        return response.OneListGetByCardIdResult;
      })
    );
  }
}
