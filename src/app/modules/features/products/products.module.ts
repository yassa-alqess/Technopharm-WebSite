import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { CategoriesRoutingModule } from './products-routing.module';
import { ProductsComponent } from './pages/products/products.component';

import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';
import { CategorySidebarComponent } from 'shared/components/category-sidebar/category-sidebar.component';
import { CategoryComponent } from 'shared/components/category/category.component';
import { MenuModule } from 'shared/sub-modules/menu/menu.module';

@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    BaseSharedModule,
    MatSidenavModule,
    CategorySidebarComponent,
    CategoryComponent,
    MenuModule,
  ]
})
export class ProductsModule { }
