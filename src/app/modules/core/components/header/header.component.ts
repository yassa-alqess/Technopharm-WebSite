import { Component, inject } from '@angular/core';
import { SidebarContent } from 'core/enums';
import { AuthService, SidebarToggleService } from 'core/services';

@Component({
  selector: 'del-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private sidebarToggleService = inject(SidebarToggleService);
  private authService = inject(AuthService);

  private get isUserExist() {
    return this.authService.isUserExist;
  }

  searchValue = "";
  userMenuItems!: any[];

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
  }

  drawerToggle() {
    this.sidebarToggleService.sidebarContent.next(SidebarContent.headerCategories);
    this.sidebarToggleService.drawer.toggle();
  }

  onSearch() {
    console.log(this.searchValue);
  }
}
