import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, finalize } from 'rxjs';
import { LoadingService } from 'core/services/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private loadingService = inject(LoadingService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.setLoading(true, request.url);

    return next.handle(request).pipe(
      catchError((error) => {
        this.loadingService.setLoading(false, request.url);
        throw error;
      }),
      finalize(() => this.loadingService.setLoading(false, request.url))
    );
  }
}
