import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'core/interfaces';
import { Favorite } from 'core/interfaces/favorite/favotite';
import { AuthService } from 'core/services';
import { FavoriteService } from 'features/favorite/services/favorite.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'del-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  private authService = inject(AuthService);
  private favoriteService = inject(FavoriteService);
  private dialog = inject(MatDialog);
  private destroy$ = new Subject();

  isEnglish = false;
  favorites: Favorite[] = [];
  user!: User | null;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.userDetails$.pipe(takeUntil(this.destroy$)).subscribe(user => this.user = user);
    this.getFavorites();
  }

  getFavorites() {
    console.log(this.user);

    const body = {
      cardId: 'HOCT00638478',
      includeLines: true,
    };

    this.favoriteService.getFavorites(body).subscribe(favorites => {
      console.log(favorites)
    });
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
