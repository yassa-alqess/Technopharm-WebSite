import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AlertService } from 'core/services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private translation: TranslateService, private alert: AlertService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // 401 errors are most likely going to be because we have an expired token that we need to refresh.
        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/');
        } else {
          this.alert.error(this.translation.instant('Internal Server Error'));
        }

        return throwError(() => new Error(error.message));
      })
    );
  }
}
