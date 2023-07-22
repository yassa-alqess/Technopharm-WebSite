import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { Product } from 'core/interfaces';
import { DirectivesModule } from 'shared/sub-modules/directives/directives.module';

@Component({
  selector: 'del-product',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, DirectivesModule, NgbTooltipModule],
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
    this.productRouterLink = `/products/${this.product.ItemCategoryCode}/product/${this.product.Description}/details`;
  }

  formatNumber(number: number) {
    return new Intl.NumberFormat(`${this.isEnglish ? 'en' : 'ar'}-EG`, { style: 'currency', currency: 'EGP' }).format(number);
  }

  doAction(type: string) {
    this.action.emit({
      type,
      product: this.product
    });
  }
}
