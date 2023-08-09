import { Injectable, inject } from '@angular/core';
import { AlertService, AuthService, HttpService, TranslationService } from 'core/services';
import { BehaviorSubject, map } from 'rxjs';
import { ListType } from 'core/enums/list-type/list-type';
import { Favorite, FavoritePayload, FavoriteResponse, Product } from 'core/interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends HttpService {
  private authService = inject(AuthService);
  private router = inject(Router);
  private alert = inject(AlertService);
  private translation = inject(TranslationService);
  private favorites = new BehaviorSubject<Favorite[]>([]);
  private cardId = this.authService.cardId;
  private favorite!: Favorite;

  get favorites$() {
    return this.favorites.asObservable();
  }

  constructor() {
    super();

    if (this.authService.isUserExist) {
      const body = {
        cardId: this.cardId,
      };

      this.getFavorites(body).subscribe(response => this.favorites.next(response));
    }
  }

  getFavorites(body: { cardId: string, includeLines?: boolean, listType?: ListType; }) {
    if (this.favorites.value.length) return this.favorites.asObservable();

    body.includeLines = true;
    body.listType = ListType.Wish;

    return this.post<FavoriteResponse>({ APIName: 'OneListGetByCardId', body }).pipe(
      map(response => {
        this.favorite = response.OneListGetByCardIdResult[0];
        const items = this.favorite?.Items;

        return items.map(items => {
          return {
            ...this.favorite,
            Item: {
              Id: items.ItemId,
              Description: items.ItemDescription,
              Images: [items.Image],
              ItemPrice: items.Price,
              ItemCategoryCode: items.ItemCategoryCode,
              ProductGroupId: items.ProductGroupId,
              AllowedToSell: true,
              isFavorite: true,
            } as Product
          };
        });
      })
    );
  }

  add(item: Product, callBack?: () => void) {
    if (this.authService.isUserExist) {
      if (!this.isItemFavorite(item)) {
        const body = {
          cardId: this.cardId,
        };

        this.addFavorite(item).subscribe(() => {
          this.resetFavorites();
          this.getFavorites(body).subscribe(response => this.favorites.next(response));
          if (callBack) callBack();
        });
      }
    } else {
      this.alert.info(this.translation.instant('ALERT.MUST_LOGIN'));
      this.router.navigateByUrl('/account/login');
    }
  }

  remove(item: Product, callBack?: () => void) {
    const body = {
      cardId: this.cardId,
    };

    this.removeFavorite(item).subscribe(() => {
      this.resetFavorites();
      this.getFavorites(body).subscribe(response => this.favorites.next(response));
      if (callBack) callBack();
    });
  }

  resetFavorites() {
    this.favorites.next([]);
  }

  isItemFavorite(item: Product) {
    const favoriteItems = this.favorites.value.filter(each => each.Item);
    return favoriteItems.some(favoriteItem => favoriteItem.Item?.Id === item.Id);
  }

  private addFavorite(item: Product) {
    const favorite = this.favoritePayload;
    favorite.Items = [
      ...this.favorite?.Items || [],
      {
        ItemId: item.Id,
        ItemDescription: item.Description,
        Detail: item.Details,
        ItemCategoryCode: item.ItemCategoryCode,
        ProductGroupId: item.ProductGroupId,
        Image: item.Images[0],
        Amount: +item.ItemPrice,
        Price: +item.ItemPrice,
        NetAmount: +item.ItemPrice,
        NetPrice: +item.ItemPrice,

        Quantity: 1,
        DisplayOrderId: ListType.Wish,
        UnitOfMeasureId: 'EACH',
        UnitOfMeasureDescription: 'EACH',
        OnelistItemDiscounts: [],
        DiscountAmount: 0,
        TaxAmount: 0,
        DiscountPercent: 0,
        BarcodeId: '',
        VariantId: '',
        VariantDescription: '',
        VariantRegistration: null
      }
    ];

    if (this.favorite) {
      favorite.Id = this.favorite.Id;
    }

    const body: FavoritePayload = {
      oneList: favorite,
      calculate: true
    };

    return this.post<any>({ APIName: 'OneListSave', body });
  }

  private removeFavorite(item: Product) {
    const favorite = this.favoritePayload;

    const unRemovedFavorites = this.favorite?.Items.filter(favorite => favorite.ItemId.toString() !== item.Id.toString());
    favorite.Items = unRemovedFavorites;

    if (this.favorite) {
      favorite.Id = this.favorite.Id;
    }

    const body: FavoritePayload = {
      oneList: favorite,
      calculate: true
    };

    return this.post<any>({ APIName: 'OneListSave', body });
  }

  private get favoritePayload(): Favorite {
    return {
      CardId: this.cardId,
      ListType: ListType.Wish,
      CardLinks: [
        {
          CardId: this.cardId,
          Name: 'Any',
          Owner: true,
          Status: 1
        }
      ],
      Items: [],
      Description: `Wish: ${this.cardId}`,
      ExternalType: 0,
      PointAmount: 0,
      PublishedOffers: [],
      ShippingAmount: 0,
      StoreId: 'WEB',
      TotalAmount: 0,
      TotalDiscAmount: 0,
      TotalNetAmount: 0,
      TotalTaxAmount: 0,
    };
  }
}
