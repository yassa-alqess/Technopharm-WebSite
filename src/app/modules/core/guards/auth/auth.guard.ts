import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'core/services';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isUserExist) {
      return this.authService.userDetails$.pipe(map(user => {
        if (user) {
          return true;
        }

        this.router.navigateByUrl('/');
        return false;
      }));
    }

    this.router.navigateByUrl('/account/login');
    return false;
  }
}
