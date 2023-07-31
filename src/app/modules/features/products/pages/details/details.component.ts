import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Product } from 'core/interfaces';
import { ProductsService } from 'features/products/services/products/products.service';
import { Subject, distinctUntilChanged, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'del-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private router = inject(Router);
  private destroy$ = new Subject();

  product!: Product;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProduct();
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.getProduct();
    });
  }

  getProduct() {
    const itemId = this.activatedRoute.snapshot.queryParamMap.get('productId') || '';
    this.productsService.getProduct({ itemId }).subscribe(product => this.product = product);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
