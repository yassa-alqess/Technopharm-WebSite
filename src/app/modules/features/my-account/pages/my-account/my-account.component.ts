import { Component } from '@angular/core';

@Component({
  selector: 'del-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {

  myAccountTabs = [
    {
      tabName: 'MY_ACCOUNT.MY_INFO',
      tabRoute: 'information'
    },
    {
      tabName: 'MY_ACCOUNT.ORDERS',
      tabRoute: 'orders'
    },
    {
      tabName: 'MY_ACCOUNT.ADDRESSES',
      tabRoute: 'addresses'
    },
    {
      tabName: 'MY_ACCOUNT.WALLET',
      tabRoute: 'wallet'
    },
  ];
}
