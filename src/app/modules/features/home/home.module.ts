import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';
import { ProductComponent } from 'shared/components';

import { HomeBestSellerComponent } from './components/home-best-seller/home-best-seller.component';
import { BannerComponent, HomeCategoriesComponent } from './components';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    HomeCategoriesComponent,
    HomeBestSellerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BaseSharedModule,
    ProductComponent
  ]
})
export class HomeModule { }
