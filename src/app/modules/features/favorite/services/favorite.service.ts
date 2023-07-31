import { Injectable, inject } from '@angular/core';
import { AuthService, HttpService } from 'core/services';
import { BehaviorSubject, Subject, map, takeUntil } from 'rxjs';
import { ListType } from 'core/enums/list-type/list-type';
import { Favorite, FavoritePayload, FavoriteResponse, Product } from 'core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends HttpService {
  private authService = inject(AuthService);
  private favorites = new BehaviorSubject<Favorite[]>([]);
  private destroy$ = new Subject();
  private cardId = '';

  get favorites$() {
    return this.favorites.asObservable();
  }

  constructor() {
    super();

    this.authService.userDetails$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      this.cardId = user?.Cards![0]?.Id as string; // 'HOCT00638478'

      const body = {
        cardId: this.cardId,
      };
  
      this.getFavorites(body).subscribe(response => this.favorites.next(response));
    });
  }

  getFavorites(body: { cardId: string, includeLines?: boolean, listType?: ListType; }) {
    if (this.favorites.value.length) return this.favorites.asObservable();

    body.includeLines = true;
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
              isFavorite: true,
            } as Product;
          }

          return each;
        });

        return response.OneListGetByCardIdResult;
      })
    ).pipe(
      map(response => response.filter(each => each.Item))
    );
  }

  add(item: Product, callBack?: () => void) {
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
  }

  resetFavorites() {
    this.favorites.next([]);
  }

  isItemFavorite(item: Product) {
    const favoriteItems = this.favorites.value.filter(each => each.Item);
    return favoriteItems.some(favoriteItem => favoriteItem.Item?.Id === item.Id);
  }

  private addFavorite(item: Product) {
    const body: FavoritePayload = {
      oneList: {
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
        Items: [
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
        ],
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
      },
      calculate: true
    };

    return this.post<any>({ APIName: 'OneListSave', body });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
