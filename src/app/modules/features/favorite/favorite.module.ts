import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { SubTitleComponent } from 'shared/components';
import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { FavoriteRoutingModule } from './favorite-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductComponent } from "../../shared/components/standalone/product/product.component";
import { ProductDetailsComponent } from "../../shared/components/standalone/product-details/product-details.component";

@NgModule({
    declarations: [
        FavoriteComponent
    ],
    imports: [
        CommonModule,
        FavoriteRoutingModule,
        MatDialogModule,
        BaseSharedModule,
        SubTitleComponent,
        ProductComponent,
        ProductDetailsComponent
    ]
})
export class FavoriteModule { }
