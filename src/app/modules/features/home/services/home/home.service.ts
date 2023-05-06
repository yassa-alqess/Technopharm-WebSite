import { Injectable } from '@angular/core';
import { HttpService } from 'core/services';
import { of } from 'rxjs';
import { HomeBanners } from '../../../../../../assets/mock-data/home-banners';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends HttpService {

  get banners() {
    return of(HomeBanners)
    // return this.post<any[]>({ APIName: '' }).pipe(map(response => response));
  }
}
