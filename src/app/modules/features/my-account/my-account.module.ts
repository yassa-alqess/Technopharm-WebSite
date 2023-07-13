import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { InformationComponent } from './components/information/information.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { WalletComponent } from './components/wallet/wallet.component';

@NgModule({
  declarations: [
    MyAccountComponent,
    InformationComponent,
    OrdersComponent,
    AddressesComponent,
    WalletComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    BaseSharedModule,
    MyAccountRoutingModule
  ]
})
export class MyAccountModule { }
