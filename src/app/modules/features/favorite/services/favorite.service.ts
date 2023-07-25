import { Injectable } from '@angular/core';
import { HttpService } from 'core/services';
import { FavoriteResponse } from 'core/interfaces/favorite/favotite';
import { map } from 'rxjs';
import { ListType } from 'core/enums/list-type/list-type';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends HttpService {

  getFavorits(body:{cardId:string , includeLines:boolean,listType:ListType}={
    "cardId":"HOCT00638478",
    "includeLines":true,
    "listType":ListType.Wish
  } ){
      return this.post<FavoriteResponse>({APIName:'OneListGetByCardId',body}).pipe(
        map(response=>response.OneListGetByCardIdResult)
      )
  }
}
