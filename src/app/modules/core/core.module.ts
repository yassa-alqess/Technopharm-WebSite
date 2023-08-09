import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';

import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

import { FooterComponent, HeaderComponent, LayoutComponent, SidebarComponent } from './components';
import { HeaderCategoriesComponent, HeaderTopComponent } from './components/header/components';

import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { BreadcrumbComponent, CategorySidebarComponent, ProductPopupItemComponent, SubTitleComponent } from 'shared/components';
import { ButtonComponent } from "../shared/components/standalone/button/button.component";
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


const COMPONENTS = [
  LayoutComponent,
  FooterComponent,
  SidebarComponent,
  HeaderComponent,
  HeaderTopComponent,
  HeaderCategoriesComponent,
  SearchComponent
];

const MATERIAL_MODULES = [
  MatBadgeModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  MatAutocompleteModule,
  ReactiveFormsModule,
  NgFor,

  AsyncPipe,
];

@NgModule({
  declarations: [...COMPONENTS, SearchComponent],
  providers: [TranslateService],
  imports: [
    ...MATERIAL_MODULES,
    CommonModule,
    BreadcrumbComponent,
    CategorySidebarComponent,
    ProductPopupItemComponent,
    ButtonComponent,
    SubTitleComponent,
    BaseSharedModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ]
})
export class CoreModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}