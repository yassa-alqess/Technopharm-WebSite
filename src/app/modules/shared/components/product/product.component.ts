import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Product } from 'core/interfaces';
import { BaseSharedModule } from 'shared/sub-modules/base-shared';

@Component({
  selector: 'del-product',
  standalone: true,
  imports: [CommonModule, BaseSharedModule, NgbTooltipModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  isEnglish = false;
  selectedProductImage = '';
  productRouterLink = '';

  @Input() product!: Product;

  @Output() action = new EventEmitter();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.selectedProductImage = this.product.Images[0].Location;
    this.productRouterLink = `/products/${this.product.ItemCategoryCode}`;
  }

  formatNumber(number: number) {
    return new Intl.NumberFormat(`${this.isEnglish ? 'en' : 'ar'}-EG`, { style: 'currency', currency: 'EGP' }).format(number);
  }

  doAction(type: string) {
    this.action.emit({
      type,
      productId: this.product.Id
    });
  }
}
