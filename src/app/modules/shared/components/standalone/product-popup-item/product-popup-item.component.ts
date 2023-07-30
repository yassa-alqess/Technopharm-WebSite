import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() removeFavorite = new EventEmitter();

  isEnglish = false;

  formatNumber(number: number) {
    return new Intl.NumberFormat(`${this.isEnglish ? 'en' : 'ar'}-EG`, { style: 'currency', currency: 'EGP' }).format(number);
  }
  remove() {
    this.removeFavorite.emit(this.item);
  }
}
