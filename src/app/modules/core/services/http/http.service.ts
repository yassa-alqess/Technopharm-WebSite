import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../../environments/environment';

declare interface HttpServiceBaseService {
  baseUrl: string;
}

interface API_Config<T = any> {
  APIName?: string,
  body?: T,
  params?: { [header: string]: string | string[]; },
}

@Injectable({
  providedIn: 'root'
})
export abstract class HttpService implements HttpServiceBaseService {

  private domainName = environment.HOST_API;
  private http = inject(HttpClient);

  baseUrl = 'UCJson.svc/';

  get<T>(API_Config: API_Config) {
    return this.http.get<T>(`${this.domainName}${this.baseUrl}${API_Config.APIName}`, { params: API_Config.params })
      .pipe(map(event => {
        return event;
      }));
  }

  post<T>(API_Config: API_Config) {
    return this.http.post<T>(`${this.domainName}${this.baseUrl}${API_Config.APIName}`, JSON.stringify(API_Config.body), { params: API_Config.params })
      .pipe(map(event => {
        return event;
      }));
  }

  put(API_Config: API_Config): Observable<boolean> {
    return this.http.put<boolean>(`${this.domainName}${this.baseUrl}${API_Config.APIName}`, JSON.stringify(API_Config.body), { params: API_Config.params })
      .pipe(map(event => {
        return event;
      }));
  }

  delete(API_Config: API_Config): Observable<boolean> {
    return this.http.delete<boolean>(`${this.domainName}${this.baseUrl}${API_Config.APIName}`, { body: JSON.stringify(API_Config.body), params: API_Config.params })
      .pipe(map(event => {
        return event;
      }));
  }
}
