import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Product } from 'core/interfaces';
import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';
import { CategoriesService } from 'core/services';

@Component({
  selector: 'del-product',
  standalone: true,
  imports: [CommonModule, BaseSharedModule, NgbTooltipModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  isEnglish = false;
  categoriesService = inject(CategoriesService);
  selectedProductImage = '';
  productRouterLink = '';

  @Input() product!: Product;

  @Output() action = new EventEmitter();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.productRouterLink = `/categories/${this.product.ItemCategoryCode}`;
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
