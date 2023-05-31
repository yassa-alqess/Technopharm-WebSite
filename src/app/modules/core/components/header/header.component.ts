import { Component, inject } from '@angular/core';
import { SidebarContent } from 'core/enums';
import { SidebarToggleService } from 'core/services/sidebar-toggle/sidebar-toggle.service';

@Component({
  selector: 'del-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userMenuItems = [
    {
      menuItemName: 'USER_HEADER_LIST.SIGN_IN',
      menuItemRoute: 'account/login'
    },
    {
      menuItemName: 'USER_HEADER_LIST.REGISTER',
      menuItemRoute: 'account/register'
    },
    {
      menuItemName: 'USER_HEADER_LIST.MY_ACCOUNT',
      menuItemRoute: 'account/my-account'
    },
  ];

  searchValue = "";

  sidebarToggleService = inject(SidebarToggleService);

  drawerToggle() {
    this.sidebarToggleService.sidebarContent.next(SidebarContent.headerCategories);
    this.sidebarToggleService.drawer.toggle();
  }

  onSearch() {
    console.log(this.searchValue);
  }
}
