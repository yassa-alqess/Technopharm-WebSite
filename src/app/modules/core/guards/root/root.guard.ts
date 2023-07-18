import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CategoriesService } from 'core/services';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RootGuard implements CanActivate {
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.categoriesService.categories.pipe(
      map((categories) => true),
      catchError((error) => {

        this.router.navigateByUrl('/account/login');
        return throwError(() => new Error(error));
      })
    );
  }
}
