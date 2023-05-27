import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Category } from 'core/interfaces';
import { CategoriesService } from 'core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolver implements Resolve<Category[]> {
  constructor(private categoriesService: CategoriesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
    return this.categoriesService.categories;
  }
}
