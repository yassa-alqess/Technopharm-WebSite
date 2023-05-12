import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoriesResolver } from './resolvers/categories/categories.resolver';

const routes: Routes = [
  {
    path: '', // query params -> subCategoryId
    data: {
      breadcrumb: '',
      categories: []
    },
    resolve: {
      categories: CategoriesResolver
    },
    component: CategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
