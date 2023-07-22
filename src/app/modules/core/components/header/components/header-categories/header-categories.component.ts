import { Component } from '@angular/core';

import { CategoryIDs, StaticCategoriesIDs } from 'core/enums';
import { Category } from 'core/interfaces';
import { CategoriesService } from 'core/services';

import { environment } from '../../../../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'del-header-categories',
  templateUrl: './header-categories.component.html',
  styleUrls: ['./header-categories.component.scss']
})
export class HeaderCategoriesComponent {
  isEnglish = true;
  categories: Category[] = [];
  maxItemCount = 10;
  magazineURL = environment.magazineURL;

  private get staticCategories(): Category[] {
    return [
      {
        Id: StaticCategoriesIDs.ABOUT,
        Description: "About Us",
        ArabicDescription: "نبذة عنا",
        route: StaticCategoriesIDs.ABOUT.replace('_', '-').toLowerCase()
      },
      {
        Id: StaticCategoriesIDs.CONTACT,
        Description: "Contact Us",
        ArabicDescription: "إتصل بنا",
        route: StaticCategoriesIDs.CONTACT.replace('_', '-').toLowerCase()
      }
    ];
  }

  constructor(private categoriesService: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCategories();
  }

  /**
   * get categories from the server side and add the static categories to its array
   */
  getCategories() {
    this.categoriesService.categories.subscribe(categories => {
      this.categories = [...categories, ...this.staticCategories];
    });
  }

  /**
   * @returns `boolean`
   * @description  if the current page is Home, the `text-primary` class will be added.
   */
  get isHome(): boolean {
    return this.router.url == '/';
  }

  /**
   * 
   * @param categoryId `string`
   * @returns `boolean`
   * @description if the selected category is active, the `text-primary` class will be added.
   */
  isActiveCategory(categoryId: string): boolean {
    return this.router.url.includes(categoryId?.replaceAll(' ', '_'));
  }

  /**
   * 
   * @param categoryId `CategoryIDs | StaticCategoriesIDs`
   * @param subCategoryId `string | null`
   * @description generate the sub-category router link
   */
  getSubCategoryRouterLink(categoryId: CategoryIDs | StaticCategoriesIDs, subCategoryId: string | null) {
    const routerLink = `products`,
      categoryRouterLink = categoryId?.replaceAll(' ', '_'),
      subCategoryRouterLink = subCategoryId?.replaceAll(' ', '_');

    return {
      routerLink: `${routerLink}/${categoryRouterLink}`,
      queryParams: { subCategoryId: subCategoryRouterLink }
    };
  }
}
