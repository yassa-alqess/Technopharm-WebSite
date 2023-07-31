import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { LoadingService } from 'core/services/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private loadingService = inject(LoadingService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true, request.url);

    return next.handle(request).pipe(
      catchError((err: any) => {
        this.loadingService.setLoading(false, request.url);
        throw err;
      }),
      map((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.loadingService.setLoading(false, request.url);
        }

        return evt;
      })
    );
  }
}
