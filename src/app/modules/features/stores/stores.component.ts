import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { TitleComponent } from 'shared/components';
import { HomeService } from 'features/home/services/home/home.service';
import { Store } from 'core/interfaces/store/sore';

@Component({
  selector: 'del-stores',
  standalone: true,
  imports:
    [CommonModule,
      BaseSharedModule,
      TitleComponent
    ],
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent {

  private homeervice = inject(HomeService);

  isEnglish = false;
  stores: Store[] = [];

  ngOnInit() {
    this.getStores();
  }

  getStores() {
    this.homeervice.getStores().subscribe(stores => this.stores = stores);
  }

  setStorePlaceholderImage(store: Store) {
    const placeholderImage = 'assets/images/common/Product_Image_Placeholder.png';
    if (store.Images.length) {
      store.Images[0].Location = placeholderImage;
    }
    // else {
    //   store.Images = [
    //     {
    //       Location: placeholderImage,
    //     }
    //   ];
    // }
  }
}
