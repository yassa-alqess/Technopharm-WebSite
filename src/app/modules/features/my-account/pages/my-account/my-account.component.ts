import { Component, inject } from '@angular/core';
import { User } from 'core/interfaces';
import { AuthService } from 'core/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'del-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {
  private authService = inject(AuthService);
  private destroy$ = new Subject();

  user!: User | null;
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

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.userDetails$.pipe(takeUntil(this.destroy$)).subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
