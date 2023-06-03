import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject, filter, distinctUntilChanged, takeUntil } from 'rxjs';
import { CategoryIDs } from 'core/enums';
import { Category, ProductGroup } from 'core/interfaces';
import { CategoriesService } from 'core/services';
import { SidebarToggleService } from 'core/services/sidebar-toggle/sidebar-toggle.service';
import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';
import { CategoryComponent } from '../category/category.component';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'del-category-sidebar',
  standalone: true,
  imports: [CommonModule, CategoryComponent, TitleComponent, BaseSharedModule],
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
      this.getSubSelectedCategory();
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

      const subCategoryId = route.snapshot.queryParamMap.get('subCategoryId') as string;
      if (subCategoryId) {
        this.selectedSubCategoryId = subCategoryId.replaceAll('_', ' ');
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
    if (!selectedCategory) return;

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
    const subCategoryId = this.selectedSubCategoryId?.replaceAll(' ', '_'),
      subCategoryRouterLink = subCategoryId,
      queryParams = { subCategoryId: subCategoryRouterLink };

    if (!this.subCategories.map(subCategory => subCategory.Id).includes(this.selectedSubCategoryId)) return;

    this.router.navigate([], { queryParams, relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
