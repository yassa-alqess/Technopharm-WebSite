import { Injectable } from '@angular/core';
import { MagazineResponse } from 'core/interfaces/magazine/magazine';
import { HttpService } from 'core/services';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MagazineService extends HttpService {

  getMagazines() {
    return this.post<MagazineResponse>({ APIName: 'MagazinesList' }).pipe(
      map(response => response.MagazinesListResult),
    );
  }

}
