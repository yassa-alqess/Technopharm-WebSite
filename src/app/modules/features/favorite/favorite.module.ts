import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { SubTitleComponent } from 'shared/components';
import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { FavoriteRoutingModule } from './favorite-routing.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    FavoriteComponent
  ],
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    MatDialogModule,
    BaseSharedModule,
    SubTitleComponent
  ]
})
export class FavoriteModule { }
