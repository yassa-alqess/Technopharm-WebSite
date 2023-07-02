import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Advertisement, Category, Offer, Product, ProductGroup } from 'core/interfaces';
import { CategoriesService } from 'core/services';
import { HomeService } from 'features/home/services/home/home.service';
import { map } from 'rxjs';

@Component({
  selector: 'del-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  dialog = inject(MatDialog);
  categoriesService = inject(CategoriesService);

  banners: Advertisement[] = [];
  categories: Category[] = [];
  bestSelerItems: Product[] = [];
  offers: Offer[] = [];

  private get isUserExist() {
    return localStorage.getItem("del-user-sign-up") === "false"; // true
  }

  @ViewChild("completeRegistration") completeRegistration!: TemplateRef<any>;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getHomeBanners();
    this.getCategories();
    this.getBestSellerItems();
    this.getOffers();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (!this.isUserExist && localStorage.getItem('del-user-phone') !== null)
      this.dialog.open(this.completeRegistration, {
        autoFocus: false,
        disableClose: true,
        panelClass: ['medium', 'p-0'],
      });
  }

  /**
   * get getHomeBanners from the server side
   */
  getHomeBanners() {
    this.homeService.getBanners().subscribe(banners => this.banners = banners);
  }

  /**
   * get categories from the server side and add the static categories to its array
   */
  getCategories() {
    this.categoriesService.categories.subscribe(categories => {
      categories.map(category => category.Id.replaceAll(' ', '_'));

      this.categories = categories;
    });
  }

  /**
   * get bestSellerItems from the server side
   */
  getBestSellerItems() {
    this.homeService.getBestSellerItems().subscribe(bestSelerItems => {
      const categories$ = this.categoriesService.categories.pipe(map(categories => {
        bestSelerItems.map(product => {
          const category = categories.find(category => category.Id === product.ItemCategoryCode) as Category;

          product.ItemSubCategory = category?.ProductGroups?.find(each => each.Id === product.ProductGroupId) as ProductGroup;
        });
      })).subscribe(() => {
        this.bestSelerItems = bestSelerItems;

        setTimeout(() => categories$.unsubscribe());
      });
    });
  }

  /**
   * get offers from the server side
   */
  getOffers() {
    this.homeService.getOffers().subscribe(offers => this.offers = offers);
  }
}
