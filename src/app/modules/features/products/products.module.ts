import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './products-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MatSidenavModule
  ]
})
export class ProductsModule { }
