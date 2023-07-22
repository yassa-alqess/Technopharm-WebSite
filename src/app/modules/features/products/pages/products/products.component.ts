import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SidebarContent } from 'core/enums';
import { ProductsService } from 'features/products/services/products/products.service';
import { SidebarToggleService } from 'core/services/sidebar-toggle/sidebar-toggle.service';
import { Product, ProductsPayload } from 'core/interfaces';
import { Subject, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'del-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  private destroy$ = new Subject();
  private dialog = inject(MatDialog);

  sidebarToggleService = inject(SidebarToggleService);
  activeFilterOption = '';
  pageNumber = 1;
  pageSize = 12;
  products: Product[] = [];
  product!: Product;
  filterOptions = [
    {
      optionCode: 'LowestPrice',
      optionName: 'ACTIONS.LOWEST_PRICE',
    },
    {
      optionCode: 'HighestPrice',
      optionName: 'ACTIONS.HIGHEST_PRICe',
    }
  ];

  @ViewChild("productDetails") productDetails!: TemplateRef<any>;

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute, private router: Router) {
    router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => this.getProducts());
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setActiveFilterClass();
    this.getProducts();
  }

  getProducts() {
    const body: ProductsPayload = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      itemCategoryId: this.activatedRoute.snapshot.paramMap.get('categoryCode')?.replaceAll('_', ' ') || '',
      productGroupId: this.activatedRoute.snapshot.queryParamMap.get('subCategoryId')?.replaceAll('_', ' ') || '',
      search: '',
      includeDetails: true,
    };

    document.querySelector('.mat-drawer-content')?.scrollTo({ top: 0, behavior: 'smooth' });
    this.productsService.getProducts(body).subscribe(products => this.products = products);
  }

  drawerToggle() {
    this.sidebarToggleService.sidebarContent.next(SidebarContent.sidebarCategories);
    this.sidebarToggleService.drawer.toggle();
  }

  doAction(action: { type: string; productId: string; }, product: Product) {
    if (action.type === 'favorites') return this.addToFavorites(action.productId);
    if (action.type === 'modal-view') return this.viewProductAsModal(product);
    if (action.type === 'add-to-cart') return this.addToCart(action.productId);
  }

  addToFavorites(productId: string) {
    console.log('favorites', productId);
  }

  viewProductAsModal(product: Product) {
    this.product = product;
    this.dialog.open(this.productDetails, {
      autoFocus: false,
      panelClass: ['medium', 'p-0'],
    });
  }

  addToCart(productId: string) {
    console.log('add-to-cart', productId);
  }

  sort(sortOptionCode: string) {
    let products: Product[] = [];

    if (sortOptionCode === 'LowestPrice') {
      products = this.products.sort((a, b) => (a.ItemPrice > b.ItemPrice) ? 1 : ((b.ItemPrice > a.ItemPrice) ? -1 : 0));
    }

    if (sortOptionCode === 'HighestPrice') {
      products = this.products.sort((a, b) => (b.ItemPrice < a.ItemPrice) ? -1 : ((a.ItemPrice < b.ItemPrice) ? 1 : 0));
    }

    this.products = products;
  }

  setActiveFilterClass() {
    this.activeFilterOption = 'col-12';

    if (innerWidth >= 576 && innerWidth < 992) {
      this.activeFilterOption = 'col-sm-6';
      return;
    }

    if (innerWidth >= 992 && innerWidth < 1200) {
      this.activeFilterOption = 'col-sm-4';
    }

    if (innerWidth >= 1200) {
      this.activeFilterOption = 'col-xl-3';
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
