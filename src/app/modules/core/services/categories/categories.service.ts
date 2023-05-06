import { Injectable } from '@angular/core';
import { CategoryResponse } from 'core/interfaces';
import { HttpService } from '../http/http.service';
import { catchError, map } from 'rxjs';
import { Categories } from '../../../../../assets/mock-data/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends HttpService {

  get categories() {
    return this.post<CategoryResponse>({ APIName: 'ItemCategoriesGetAll' }).pipe(
      map(response => response.ItemCategoriesGetAllResult),
      catchError(async () => Categories)
    );
  }
}
