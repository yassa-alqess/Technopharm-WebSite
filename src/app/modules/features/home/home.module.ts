import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';

import { BannerComponent } from './components';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BaseSharedModule
  ]
})
export class HomeModule { }
