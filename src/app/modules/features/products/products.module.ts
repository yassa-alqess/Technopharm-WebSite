import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ProductsComponent } from './pages/products/products.component';
import { CategoriesRoutingModule } from './products-routing.module';

import { MenuModule } from 'shared/sub-modules/menu/menu.module';
import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';
import { CategoryComponent } from 'shared/components/category/category.component';
import { CategorySidebarComponent } from 'shared/components/category-sidebar/category-sidebar.component';
import { ProductComponent } from 'shared/components';

@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    BaseSharedModule,
    MatSidenavModule,
    MenuModule,
    ProductComponent,
    CategoryComponent,
    CategorySidebarComponent,
  ]
})
export class ProductsModule { }
