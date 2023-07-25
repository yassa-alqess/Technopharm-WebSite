import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SubTitleComponent } from 'shared/components';
import { BaseSharedModule } from 'shared/sub-modules/base-shared';



@NgModule({
  declarations: [
    FavoriteComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    BaseSharedModule,
    SubTitleComponent
  ]
})
export class FavorietModule { }
