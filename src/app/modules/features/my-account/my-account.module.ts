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
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { AccountAddressFormComponent, AccountInfoFormComponent, ButtonComponent } from 'shared/components';
import { MatDialogModule } from '@angular/material/dialog';
import { AddEditAddressComponent } from './components/add-edit-address/add-edit-address.component';
import { SubTitleComponent } from "../../shared/components/standalone/sub-title/sub-title.component";
import { OrderDetailsComponent } from './components/order-details/order-details.component';

@NgModule({
    declarations: [
        MyAccountComponent,
        InformationComponent,
        OrdersComponent,
        AddressesComponent,
        WalletComponent,
        EditAccountComponent,
        AddEditAddressComponent,
        OrderDetailsComponent
    ],
    imports: [
        CommonModule,
        MyAccountRoutingModule,
        MatTabsModule,
        BaseSharedModule,
        MatDialogModule,
        ButtonComponent,
        AccountInfoFormComponent,
        AccountAddressFormComponent,
        SubTitleComponent
    ]
})
export class MyAccountModule { }
