import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';

import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';
import { ProductComponent, SubTitleComponent } from 'shared/components';

import { BannerComponent, HomeCategoriesComponent, HomeBestSellerComponent, HomeOffersComponent } from './components';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    HomeCategoriesComponent,
    HomeBestSellerComponent,
    HomeOffersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BaseSharedModule,
    ProductComponent,
    SubTitleComponent
  ]
})
export class HomeModule { }
