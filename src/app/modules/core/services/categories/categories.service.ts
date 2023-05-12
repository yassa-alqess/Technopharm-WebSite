import { Injectable } from '@angular/core';
import { Category, CategoryResponse } from 'core/interfaces';
import { HttpService } from '../http/http.service';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { Categories } from '../../../../../assets/mock-data/categories';

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
}
