import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'core/components/layout/layout.component';
import { AuthGuard } from 'core/guards/auth/auth.guard';

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
        path: 'categories',
        data: {
          breadcrumb: ''
        },
        children: [
          {
            path: ':categoryCode',
            data: {
              breadcrumb: ''
            },
            loadChildren: () => import('./modules/features/categories/categories.module').then(m => m.CategoriesModule),
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
