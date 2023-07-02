import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ProductsComponent } from './pages/products/products.component';
import { DetailsComponent } from './pages/details/details.component';
import { CategoriesRoutingModule } from './products-routing.module';

import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { CategorySidebarComponent, ProductComponent, ProductDetailsComponent } from 'shared/components';

@NgModule({
  declarations: [
    ProductsComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    BaseSharedModule,
    MatSidenavModule,
    ProductComponent,
    CategorySidebarComponent,
    ProductDetailsComponent
  ]
})
export class ProductsModule { }
