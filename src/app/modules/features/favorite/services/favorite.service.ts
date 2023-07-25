import { Injectable } from '@angular/core';
import { HttpService } from 'core/services';
import { FavoriteResponse } from 'core/interfaces/favorite/favotite';
import { map } from 'rxjs';
import { ListType } from 'core/enums/list-type/list-type';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends HttpService {

  getFavorites(body: { cardId: string, includeLines: boolean, listType?: ListType; }) {
    body.listType = ListType.Wish;

    return this.post<FavoriteResponse>({ APIName: 'OneListGetByCardId', body }).pipe(
      map(response => {
        response.OneListGetByCardIdResult.forEach(each => {
          if (each.Items.length) each.Item = each.Items[0];
        });

        return response.OneListGetByCardIdResult;
      })
    );
  }
}
