import { Injectable } from '@angular/core';
import { MagazineResponse } from 'core/interfaces';
import { HttpService } from 'core/services';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MagazineService extends HttpService {

  get magazines() {
    return this.post<MagazineResponse>({ APIName: 'MagazinesList' }).pipe(
      map(response => response.MagazinesListResult),
    );
  }
}
