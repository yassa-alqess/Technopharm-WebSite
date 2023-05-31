import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesResolver } from './resolvers/categories/categories.resolver';

const routes: Routes = [
  {
    path: '', // query params -> subCategoryId
    children: [
      {
        path: '',
        data: {
          breadcrumb: '',
          categories: [],
          queryParamKeyName: 'subCategoryId'
        },
        resolve: {
          categories: CategoriesResolver
        },
        component: ProductsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
