import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, finalize } from 'rxjs';
import { LoadingService } from 'core/services';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private loadingService = inject(LoadingService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const body: any = request.body;
    if (body && "isLoading" in JSON.parse(body)) {
      if (body.isLoading) {
        this.loadingService.setLoading(true, request.url);
      }

      delete body.isLoading;
    } else {
      this.loadingService.setLoading(true, request.url);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        this.loadingService.setLoading(false, request.url);
        throw error;
      }),
      finalize(() => this.loadingService.setLoading(false, request.url))
    );
  }
}
