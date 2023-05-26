import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CategoryIDs } from 'core/enums';
import { Category, ProductGroup } from 'core/interfaces';
import { CategoriesService } from 'core/services';
import { Subject, filter, distinctUntilChanged, takeUntil } from 'rxjs';
import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';
import { CategoryComponent } from '../category/category.component';
import { SidebarToggleService } from 'core/services/sidebar-toggle/sidebar-toggle.service';

@Component({
  selector: 'del-category-sidebar',
  standalone: true,
  imports: [CommonModule, CategoryComponent, BaseSharedModule],
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.scss']
})
export class CategorySidebarComponent {
  categories: Category[] = [];
  subCategories: ProductGroup[] = [];
  selectedCategoryId!: CategoryIDs;
  selectedSubCategoryId!: string;
  drawer = inject(SidebarToggleService).drawer;

  private destroy$ = new Subject();

  constructor(private categoriesService: CategoriesService, private router: Router, private activatedRoute: ActivatedRoute) {
    router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.setActiveCategory();
      if (this.selectedSubCategoryId) this.getSubSelectedCategory();
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCategories();
    this.setActiveCategory();
  }

  /**
   * 
   * @param route `ActivatedRoute`
   * @description set active category and sub-category while the user navigating into products page.
   */
  setActiveCategory(route = this.activatedRoute.root) {
    if (route.firstChild) {
      this.setActiveCategory(route.firstChild);
    } else {
      const selectedCategoryId = route.snapshot.paramMap.get('categoryCode')?.replaceAll('_', ' ') as CategoryIDs;
      this.getSelectedCategory(this.categories.find(category => category.Id === selectedCategoryId) as Category, false);

      const subCategoryId = this.activatedRoute.snapshot.queryParamMap.get('subCategoryId') as string;
      if (subCategoryId && this.subCategories.map(subCategory => subCategory.Id).includes(subCategoryId.replaceAll(' ', '_'))) {
        this.selectedSubCategoryId = subCategoryId.replaceAll('_', ' ');
      } else {
        // reset the `selectedSubCategoryId` property incase it's not including into the `subCategories` array.
        this.selectedSubCategoryId = '';
      }
    }
  }

  /**
   * get categories from the server side and add the static categories to its array
   */
  getCategories() {
    this.categoriesService.categories.subscribe(categories => {
      this.categories = categories;
    });
  }

  /**
   * @param selectedCategory `Category`
   * @description navigate to the selected category.
   */
  getSelectedCategory(selectedCategory: Category, navigate = true) {
    this.selectedCategoryId = selectedCategory.Id as CategoryIDs;
    const routerLink = `/products`,
      categoryId = this.selectedCategoryId?.replaceAll(' ', '_'),
      categoryRouterLink = `${routerLink}/${categoryId}`;

    this.subCategories = selectedCategory.ProductGroups as ProductGroup[];
    if (navigate) this.router.navigateByUrl(categoryRouterLink);
  }

  /**
   * @description get the `subCategoryId` from the query params.
   * @description navigate to the selected sub-category.
   */
  getSubSelectedCategory() {
    const subCategoryRouterLink = this.selectedSubCategoryId?.replaceAll(' ', '_'),
      queryParams = { subCategoryId: subCategoryRouterLink };

    this.router.navigate([], { queryParams, relativeTo: this.activatedRoute });
  }
}
