import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesResolver } from './resolvers/categories/categories.resolver';
import { DetailsComponent } from './pages/details/details.component';

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
      {
        path: 'product/:productName',
        data: {
          breadcrumb: ''
        },
        children: [
          {
            path: '', pathMatch: 'full', redirectTo: 'details'
          },
          {
            path: 'details', // /products/${categoryCode}/product/${productName}/details?productId=''
            component: DetailsComponent,
            data: {
              breadcrumb: '',
              categories: [],
              queryParamKeyName: 'subCategoryId'
            },
            resolve: {
              categories: CategoriesResolver
            },
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
