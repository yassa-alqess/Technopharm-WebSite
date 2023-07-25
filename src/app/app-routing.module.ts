import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'core/components/layout/layout.component';
import { StaticCategoriesIDs } from 'core/enums';
import { RootGuard } from 'core/guards/root/root.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [RootGuard],
    data: { breadcrumb: 'HOME' },
    children: [
      {
        path: '',
        data: { breadcrumbHidden: true },
        loadChildren: () => import('./modules/features/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'my-account',
        data: {
          breadcrumb: 'USER_HEADER_LIST.MY_ACCOUNT'
        },
        loadChildren: () => import('./modules/features/my-account/my-account.module').then(m => m.MyAccountModule),
      },
      {
        path: 'favorits',
        data: {
          breadcrumb: 'FAVORITE'
        },
        loadChildren: () => import('./modules/features/favorite/favorite.module').then(m => m.FavorietModule),
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
            ]
          }
        ]
      },
      {
        path: StaticCategoriesIDs.ABOUT.replace('_', '-').toLowerCase(),
        data: {
          breadcrumb: StaticCategoriesIDs.ABOUT
        },
        loadComponent: () => import('./modules/features/about-us/about-us.component').then(m => m.AboutUsComponent)
      },
      {
        path: StaticCategoriesIDs.CONTACT.replace('_', '-').toLowerCase(),
        data: {
          breadcrumb: `${StaticCategoriesIDs.CONTACT}.TITLE`
        },
        loadComponent: () => import('./modules/features/contact-us/contact-us.component').then(m => m.ContactUsComponent)
      },
      {
        path: 'offers',
        data: {
          breadcrumb: 'OFFERS.TITLE'
        },
        loadComponent: () => import('./modules/features/offers/offers.component').then(m => m.OffersComponent)
      },
      {
        path: 'stores',
        data: {
          breadcrumb: 'STORES'
        },
        loadComponent: () => import('./modules/features/stores/stores.component').then(m => m.StoresComponent)
      }
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
