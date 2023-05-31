import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';

import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderTopComponent } from './components/header/components/header-top/header-top.component';
import { HeaderCategoriesComponent } from './components/header/components/header-categories/header-categories.component';

import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';
import { BreadcrumbComponent } from 'shared/components';
import { MenuModule } from 'shared/sub-modules/menu/menu.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CategorySidebarComponent } from 'shared/components/category-sidebar/category-sidebar.component';

const COMPONENTS = [
  LayoutComponent,
  HeaderComponent,
  HeaderTopComponent,
  HeaderCategoriesComponent,
  FooterComponent,
  SidebarComponent
];

const MATERIAL_MODULES = [
  MatBadgeModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...MATERIAL_MODULES,
    CommonModule,
    MenuModule,
    BreadcrumbComponent,
    CategorySidebarComponent,
    BaseSharedModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [TranslateService]
})
export class CoreModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}