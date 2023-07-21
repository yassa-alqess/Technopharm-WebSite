import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User, UserPayload } from 'core/interfaces';
import { AuthService } from 'core/services';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmationDialogComponent } from 'shared/components';

@Component({
  selector: 'del-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent {
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private destroy$ = new Subject();

  user!: User;
  addresses!: User['Addresses'];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.userDetails$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      this.user = user as User;
      this.addresses = user?.Addresses as User['Addresses'];
    });
  }

  remove(addressIndex: number) {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      panelClass: ['small', 'p-0'],
      disableClose: true,
      data: {
        pageTitle: 'DIALOG.DELETE_CONFIRMATION',
        pageMessage: 'DIALOG.DELETE_MESSAGE'
      }
    });

    const dialogSubscription = dialog.afterClosed().subscribe(actionData => {
      if (actionData) {
        const body: UserPayload = {
          contact: {
            ...this.user,
            ...this.addresses,
          }
        };

        this.addresses?.splice(addressIndex, 1);

        this.authService.updateAccount(body).subscribe(() => {
          this.authService.refreshUserDetails();
          dialogSubscription.unsubscribe();
        });
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
