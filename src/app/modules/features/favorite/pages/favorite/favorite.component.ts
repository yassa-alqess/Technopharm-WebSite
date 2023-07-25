import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Favorite } from 'core/interfaces/favorite/favotite';
import { FavoriteService } from 'features/favorite/services/favorite.service';

@Component({
  selector: 'del-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {

  private favoriteService = inject(FavoriteService);
  private dialog = inject(MatDialog);

  isEnglish = false;
  favorites: Favorite[] = [];

  ngOnInit() {
    this.getFavorites();
  }


  getFavorites() {

  }

  setOfferPlaceholderImage(favorite: Favorite) {
    const placeholderImage = 'assets/images/common/Product_Image_Placeholder.png';
    // if (offer.Images.length) {
    //   offer.Images[0].Location = placeholderImage;
    // } else {
    //   offer.Images = [
    //     {
    //       Location: placeholderImage,
    //     }
    //   ];
    // }
  }

}
