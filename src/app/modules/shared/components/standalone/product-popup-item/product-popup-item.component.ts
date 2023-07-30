import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'core/interfaces';
import { DirectivesModule } from 'shared/sub-modules/directives/directives.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'del-product-popup-item',
  standalone: true,
  templateUrl: './product-popup-item.component.html',
  styleUrls: ['./product-popup-item.component.scss'],
  imports: [CommonModule, DirectivesModule, RouterModule]
})
export class ProductPopupItemComponent {
  @Input() item!: Product | undefined;
  @Output() removeFavorite = new EventEmitter();

  isEnglish = false;
  itemRouterLink = '';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.itemRouterLink = `/products/${this.item?.ItemCategoryCode}/product/${this.item?.Description}/details`;
  }

  formatNumber(number: number) {
    return new Intl.NumberFormat(`${this.isEnglish ? 'en' : 'ar'}-EG`, { style: 'currency', currency: 'EGP' }).format(number);
  }

  remove() {
    this.removeFavorite.emit();
  }
}
