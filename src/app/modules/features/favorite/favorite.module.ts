import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FavoriteRoutingModule } from './favorite-routing.module';

import { FavoriteComponent } from './pages/favorite/favorite.component';
import { ProductComponent, ProductDetailsComponent, SubTitleComponent } from 'shared/components';

@NgModule({
    declarations: [
        FavoriteComponent
    ],
    imports: [
        CommonModule,
        FavoriteRoutingModule,
        MatDialogModule,
        SubTitleComponent,
        ProductComponent,
        ProductDetailsComponent
    ]
})
export class FavoriteModule { }
