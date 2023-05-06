import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'del-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userMenuItems = [
    {
      menuItemName: 'USER_HEADER_LIST.SIGN_IN',
      menuItemRoute: 'sign-in'
    },
    {
      menuItemName: 'USER_HEADER_LIST.SIGN_OUT',
      menuItemRoute: 'sign-out'
    },
    {
      menuItemName: 'USER_HEADER_LIST.MY_ACCOUNT',
      menuItemRoute: 'my-account'
    },
  ];

  searchValue = "";

  @Input() drawer!: MatDrawer;

  onSearch() {
    console.log(this.searchValue);
  }
}
