import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'core/components/layout/layout.component';
import { AuthGuard } from 'core/guards/auth/auth.guard';
import { CategoriesResolver } from 'features/products/resolvers/categories/categories.resolver';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'HOME' },
    children: [
      {
        path: '',
        data: { breadcrumbHidden: true },
        loadChildren: () => import('./modules/features/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'products',
        data: {
          breadcrumb: ''
        },
        children: [
          {
            path: '', pathMatch: 'full', redirectTo: '/'
          },
          {
            path: ':categoryCode',
            data: {
              breadcrumb: ''
            },
            children: [
              {
                path: '',
                data: {
                  breadcrumb: ''
                },
                loadChildren: () => import('./modules/features/products/products.module').then(m => m.ProductsModule),
              },
              // {
              //   path: 'product/:productId',
              //   data: {
              //     breadcrumb: ''
              //   },
              //   children: [
              //     {
              //       path: '', pathMatch: 'full', redirectTo: 'details'
              //     },
              //     {
              //       path: 'details', // /products/${categoryCode}/product/${productId}/details?productName=''
              //       data: {
              //         breadcrumb: '',
              //         categories: [],
              //         queryParamKeyName: 'productName'
              //       },
              //       resolve: {
              //         categories: CategoriesResolver
              //       },
              //     }
              //   ]
              // }
            ]
          }
        ]
      },
    ]
  },
  {
    path: 'account',
    loadChildren: () => import('./modules/features/account/account.module').then(m => m.AccountModule)
  },
  { path: 'error', loadChildren: () => import('./modules/features/error/error.module').then(m => m.ErrorModule) },
  { path: '**', redirectTo: '/error/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
