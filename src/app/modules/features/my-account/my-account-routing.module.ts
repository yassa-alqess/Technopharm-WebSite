import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'core/guards/auth/auth.guard';
import { MyAccountComponent } from './pages/my-account/my-account.component';

import {
  InformationComponent,
  OrdersComponent,
  AddressesComponent,
  WalletComponent,
  EditAccountComponent,
  AddEditAddressComponent
} from './components';

import { DialogComponent } from 'shared/components';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

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
        data: { breadcrumb: 'MY_ACCOUNT.MY_INFO' },
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
        data: { breadcrumb: 'MY_ACCOUNT.ORDERS' },
        component: OrdersComponent,
        children:[
            {
              path: 'details',
            data: { component: OrderDetailsComponent, pageTitle: 'MY_ACCOUNT.ADDRESS.ADD' },
            component: DialogComponent,
            }

        ]
      },
      {
        path: 'addresses',
        data: { breadcrumb: 'MY_ACCOUNT.ADDRESSES' },
        component: AddressesComponent,
        children: [
          {
            path: 'add',
            data: { component: AddEditAddressComponent, pageTitle: 'MY_ACCOUNT.ADDRESS.ADD', isEdit: false, },
            component: DialogComponent,
          },
          {
            path: 'edit',
            children: [
              { path: '', redirectTo: '/my-account/addresses', pathMatch: 'full' },
              {
                path: ':addressIndex',
                data: { component: AddEditAddressComponent, pageTitle: 'MY_ACCOUNT.ADDRESS.EDIT', isEdit: true },
                component: DialogComponent,
              }
            ]
          }
        ]
      },
      {
        path: 'wallet',
        data: { breadcrumb: 'MY_ACCOUNT.WALLET' },
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
