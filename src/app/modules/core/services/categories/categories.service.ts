import { Injectable } from '@angular/core';
import { Category, CategoryResponse, ProductGroup } from 'core/interfaces';
import { HttpService } from '../http/http.service';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { Categories } from '../../../../../assets/mock-data';
import { CategoryIDs } from 'core/enums';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends HttpService {

  private categories$ = new BehaviorSubject<Category[]>([]);

  get categories() {
    if (this.categories$.value.length) {
      return this.categories$.asObservable();
    }

    return this.post<CategoryResponse>({ APIName: 'ItemCategoriesGetAll' }).pipe(
      map(response => {
        this.categories$.next(response.ItemCategoriesGetAllResult);
        return response.ItemCategoriesGetAllResult;
      }),
      catchError(() => {
        this.categories$.next(Categories);
        return of(Categories);
      }),
    );
  }

  getByCategoryCode(categoryCode: CategoryIDs) {
    return this.categories.pipe(map(categories => categories.find(category => category.Id === categoryCode) as Category));
  }

  getSubCategory(categoryCode: CategoryIDs, subCategoryCode: string) {
    return this.getByCategoryCode(categoryCode).pipe(map(category => {
      return category?.ProductGroups?.find(each => each.Id === subCategoryCode) as ProductGroup;
    }));
  }
}
