import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'core/interfaces';

@Component({
  selector: 'del-product-popup-item',
  standalone: true,
  templateUrl: './product-popup-item.component.html',
  styleUrls: ['./product-popup-item.component.scss'],
  imports: [CommonModule]
})
export class ProductPopupItemComponent {
  @Input() item!: Product;
}
