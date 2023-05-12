import { Component } from '@angular/core';

import { CategoryIDs, StaticCategoriesIDs } from 'core/enums';
import { Category } from 'core/interfaces';
import { CategoriesService } from 'core/services';

import { environment } from '../../../../../../../environments/environment';

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
        route: StaticCategoriesIDs.ABOUT.toLowerCase()
      },
      {
        Id: StaticCategoriesIDs.CONTACT,
        Description: "Contact Us",
        ArabicDescription: "إتصل بنا",
        route: StaticCategoriesIDs.CONTACT.toLowerCase()
      }
    ];
  }

  constructor(private categoriesService: CategoriesService) { }

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
   * 
   * @param categoryId `CategoryIDs | StaticCategoriesIDs`
   * @param subCategoryId `string | null`
   * @description generate the sub-category router link
   */
  getSubCategoryRouterLink(categoryId: CategoryIDs | StaticCategoriesIDs, subCategoryId: string | null) {
    const routerLink = `categories`,
      categoryRouterLink = categoryId?.replaceAll(' ', '_'),
      subCategoryRouterLink = subCategoryId?.replaceAll(' ', '_');

    return {
      routerLink: `${routerLink}/${categoryRouterLink}`,
      queryParams: { subCategoryId: subCategoryRouterLink }
    }
  }
}
