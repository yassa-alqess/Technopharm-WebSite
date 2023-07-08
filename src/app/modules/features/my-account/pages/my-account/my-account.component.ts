import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'del-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  myAccountTabs = [
    {
      tabName: 'MY_ACCOUNT.MY_INFO',
      tabKey: 'MY_INFO'
    },
    {
      tabName: 'MY_ACCOUNT.ORDERS',
      tabKey: 'ORDERS'
    },
    {
      tabName: 'MY_ACCOUNT.ADDRESSES',
      tabKey: 'ADDRESSES'
    },
    {
      tabName: 'MY_ACCOUNT.WALLET',
      tabKey: 'WALLET'
    },
  ];
  activeTabKey = this.myAccountTabs[0].tabKey;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const tabKey = this.activatedRoute.snapshot.queryParamMap.get('tabKey') || '';
    this.getActiveTab(tabKey);
  }

  getActiveTab(tabKey: string) {
    this.activeTabKey = tabKey;
    this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: { tabKey } });
  }
}
