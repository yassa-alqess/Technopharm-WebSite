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
import { BreadcrumbComponent, MenuComponent } from 'shared/components';

const COMPONENTS = [
  LayoutComponent,
  HeaderComponent,
  HeaderTopComponent,
  HeaderCategoriesComponent,
  FooterComponent
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
    MenuComponent,
    BreadcrumbComponent,
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