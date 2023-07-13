import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyAccountComponent } from './pages/my-account/my-account.component';

import { InformationComponent, OrdersComponent, AddressesComponent, WalletComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
    children: [
      {
        path: '', redirectTo: 'information', pathMatch: 'full'
      },
      {
        path: 'information',
        component: InformationComponent
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
