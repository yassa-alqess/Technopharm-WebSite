import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../../environments/environment';

declare interface HttpServiceBaseService {
  baseUrl: string;
}

export declare interface HttpServiceBaseCRUD {
  add<T>(body: any): Observable<T>;
  update<T>(body: any): Observable<T>;
  remove(id: string): Observable<boolean>;
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

  baseUrl = 'UCJson.svc/';

  constructor(private http: HttpClient) { }

  get<T>(API_Config: API_Config) {
    return this.http.get<T>(`${this.domainName}${this.baseUrl}${API_Config.APIName}`, { params: API_Config.params })
      .pipe(map(event => {
        return event;
      }));
  }

  post<T>(API_Config: API_Config) {
    return this.http.post<T>(`${this.domainName}${this.baseUrl}${API_Config.APIName}`, API_Config.body, { params: API_Config.params })
      .pipe(map(event => {
        return event;
      }));
  }

  put(API_Config: API_Config): Observable<boolean> {
    return this.http.put<boolean>(`${this.domainName}${this.baseUrl}${API_Config.APIName}`, API_Config.body, { params: API_Config.params })
      .pipe(map(event => {
        return event;
      }));
  }

  delete(API_Config: API_Config): Observable<boolean> {
    return this.http.delete<boolean>(`${this.domainName}${this.baseUrl}${API_Config.APIName}`, { body: API_Config.body, params: API_Config.params })
      .pipe(map(event => {
        return event;
      }));
  }
}
