import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offer } from 'core/interfaces';
import { HomeService } from 'features/home/services/home/home.service';
import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { SubTitleComponent } from 'shared/components';

@Component({
  selector: 'del-offers',
  standalone: true,
  imports: [CommonModule, BaseSharedModule, SubTitleComponent],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
  private homeService = inject(HomeService);

  isEnglish = false;
  offers: Offer[] = [];

  ngOnInit() {
    this.getOffers();
  }

  getOffers() {
    this.homeService.getOffers().subscribe(offers => this.offers = offers);
  }

  setOfferPlaceholderImage(offer: Offer) {
    const placeholderImage = 'assets/images/common/Product_Image_Placeholder.png';
    if (offer.Images.length) {
      offer.Images[0].Location = placeholderImage;
    } else {
      offer.Images = [
        {
          Location: placeholderImage,
        }
      ];
    }
  }
}
