import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarContent } from 'core/enums';
import { ProductsService } from 'features/products/services/products/products.service';
import { SidebarToggleService } from 'core/services/sidebar-toggle/sidebar-toggle.service';
import { Product, ProductsPayload } from 'core/interfaces';

@Component({
  selector: 'del-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  sidebarToggleService = inject(SidebarToggleService);
  activeFilterOption = '';
  pageNumber = 1;
  pageSize = 12;
  products: Product[] = [];
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

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) { }

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

    this.productsService.getProducts(body).subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  }

  drawerToggle() {
    this.sidebarToggleService.sidebarContent.next(SidebarContent.sidebarCategories);
    this.sidebarToggleService.drawer.toggle();
  }

  doAction(action: { type: string; productId: string; }) {
    if (action.type === 'favorites') return this.addToFavorites(action.productId);
    if (action.type === 'modal-view') return this.viewProductAsModal(action.productId);
    if (action.type === 'add-to-cart') return this.addToCart(action.productId);
  }

  addToFavorites(productId: string) {
    console.log('favorites', productId);
  }

  viewProductAsModal(productId: string) {
    console.log('modal-view', productId);
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
}
