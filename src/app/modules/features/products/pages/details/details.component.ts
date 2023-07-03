import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'core/interfaces';
import { ProductsService } from 'features/products/services/products/products.service';

@Component({
  selector: 'del-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  product!: Product;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProduct();
  }

  getProduct() {
    const itemId = this.activatedRoute.snapshot.queryParamMap.get('productId') || '';

    this.productsService.getProduct({ itemId }).subscribe(product => this.product = product);
  }
}
