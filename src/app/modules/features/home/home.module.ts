import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { ProductComponent, ProductDetailsComponent, SubTitleComponent } from 'shared/components';

import {
  HomeAdsComponent,
  HomeCategoriesComponent,
  HomeBestSellerComponent,
  HomeOffersComponent,
  CompleteRegistrationComponent,
} from './components';

@NgModule({
  declarations: [
    HomeComponent,
    HomeAdsComponent,
    HomeCategoriesComponent,
    HomeBestSellerComponent,
    HomeOffersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BaseSharedModule,

    // standalone components
    ProductComponent,
    SubTitleComponent,
    ProductDetailsComponent,
    CompleteRegistrationComponent,
  ]
})
export class HomeModule { }
