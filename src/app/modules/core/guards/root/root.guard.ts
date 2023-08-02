import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService, CategoriesService } from 'core/services';
import { Observable, catchError, combineLatest, map, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RootGuard implements CanActivate {
  private authService = inject(AuthService);
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
    const wihtUserRootGuard = environment.wihtUserRootGuard;
    const array = wihtUserRootGuard && this.authService.isUserExist ?
      [this.categoriesService.categories, this.authService.userDetails$] :
      [this.categoriesService.categories];

    return combineLatest(array).pipe(
      map((categories) => true),
      catchError((error) => {
        this.router.navigateByUrl('/account/login');
        return throwError(() => new Error(error));
      })
    );
  }
}
