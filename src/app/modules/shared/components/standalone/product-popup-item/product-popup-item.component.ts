import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FavoriteService } from 'features/favorite/services/favorite.service';
import { Favorite } from 'core/interfaces/favorite/favotite';
import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { ButtonComponent } from '../button/button.component';
import { SubTitleComponent } from '../sub-title/sub-title.component';
import { Product } from 'core/interfaces';

@Component({
  selector: 'del-product-popup-item',
  standalone: true,
  templateUrl: './product-popup-item.component.html',
  styleUrls: ['./product-popup-item.component.scss'],
  imports: [CommonModule,
    BaseSharedModule,
    MatDialogModule, SubTitleComponent, ButtonComponent]
})
export class ProductPopupItemComponent {

  @Input() item!: Product;



}
