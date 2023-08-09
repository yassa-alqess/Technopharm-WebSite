import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { HomeService } from 'features/home/services/home/home.service';
import { Store } from 'core/interfaces';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'del-stores',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent {
  private homeervice = inject(HomeService);

  hotLine = environment.hotLine;
  stores: Store[] = [];

  ngOnInit() {
    this.getStores();
  }

  getStores() {
    this.homeervice.getStores().subscribe(stores => this.stores = stores);
  }

  setStorePlaceholderImage(store: Store) {
    const placeholderImage = 'assets/images/common/Pharmacy_Image_Placeholder.png';
    if (store.Images.length) {
      store.Images[0].Location = placeholderImage;
    } else {
      store.Images = [
        {
          Location: placeholderImage,
        }
      ];
    }
  }
}
