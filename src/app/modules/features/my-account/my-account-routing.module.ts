import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'core/guards/auth/auth.guard';
import { MyAccountComponent } from './pages/my-account/my-account.component';

import { InformationComponent, OrdersComponent, AddressesComponent, WalletComponent } from './components';
import { DialogComponent } from 'shared/components';
import { EditAccountComponent } from './components/edit-account/edit-account.component';

const routes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', redirectTo: 'information', pathMatch: 'full'
      },
      {
        path: 'information',
        component: InformationComponent,
        children: [
          {
            path: 'edit',
            data: { component: EditAccountComponent, pageTitle: 'MY_ACCOUNT.EDIT_ACCOUNT' },
            component: DialogComponent,
          }
        ]
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'addresses',
        component: AddressesComponent
      },
      {
        path: 'wallet',
        component: WalletComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
