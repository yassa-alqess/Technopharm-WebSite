import { Component, inject } from '@angular/core';
import { SidebarContent } from 'core/enums';
import { Product, User } from 'core/interfaces';
import { Favorite } from 'core/interfaces/favorite/favotite';
import { AuthService, SidebarToggleService } from 'core/services';
import { FavoriteService } from 'features/favorite/services/favorite.service';

@Component({
  selector: 'del-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private sidebarToggleService = inject(SidebarToggleService);
  private authService = inject(AuthService);
  private favoriteService = inject(FavoriteService);

  private get isUserExist() {
    return this.authService.isUserExist;
  }

  searchValue = "";
  maxItemsToShow = 3;
  userMenuItems!: any[];
  favorites: Favorite[] = [];
  user!: User | null;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const myAccountTab = {
      menuItemName: 'USER_HEADER_LIST.MY_ACCOUNT',
      menuItemRoute: 'my-account'
    };

    if (this.isUserExist) {
      this.userMenuItems = [
        {
          menuItemName: 'USER_HEADER_LIST.SIGN_OUT',
          menuItemRoute: 'account/login',
          onClick: () => {
            localStorage.clear();
          }
        },
        myAccountTab
      ];
    } else {
      this.userMenuItems = [
        {
          menuItemName: 'USER_HEADER_LIST.SIGN_IN',
          menuItemRoute: 'account/login'
        },
        {
          menuItemName: 'USER_HEADER_LIST.REGISTER',
          menuItemRoute: 'account/register'
        },
        myAccountTab
      ];
    }

    this.getFavorites();
  }

  getFavorites() {
    console.log(this.user);

    const body = {
      cardId: 'HOCT00638478',
      includeLines: true,
    };

    this.favoriteService.getFavorites(body).subscribe(favorites => {
      this.favorites = favorites.filter(each => each.Item);
      console.log(this.favorites);
    });
  }

  drawerToggle() {
    this.sidebarToggleService.sidebarContent.next(SidebarContent.headerCategories);
    this.sidebarToggleService.drawer.toggle();
  }

  onSearch() {
    console.log(this.searchValue);
  }

  removeFavoriteProduct(item: Product) {
    console.log(item);
  }
}
