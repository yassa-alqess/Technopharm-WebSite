import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { BaseSharedModule } from 'shared/sub-modules/base-shared';

@NgModule({
  declarations: [
    MyAccountComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    BaseSharedModule,
    MyAccountRoutingModule
  ]
})
export class MyAccountModule { }
