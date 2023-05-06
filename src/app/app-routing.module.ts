import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'core/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/features/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'categories',
        children: [
          {
            path: ':categoryCode',
            loadChildren: () => import('./modules/features/categories/categories.module').then(m => m.CategoriesModule),
          }
        ]
      },
    ]
  },
  { path: 'error', loadChildren: () => import('./modules/features/error/error.module').then(m => m.ErrorModule) },
  { path: '**', redirectTo: '/error/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
