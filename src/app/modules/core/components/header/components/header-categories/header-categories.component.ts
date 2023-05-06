import { Component } from '@angular/core';

import { StaticCategoriesIDs } from 'core/enums';
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
        ArabicDescription: "نبذة عنا"
      },
      {
        Id: StaticCategoriesIDs.CONTACT,
        Description: "Contact Us",
        ArabicDescription: "إتصل بنا"
      }
    ];
  }

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.categories.subscribe(categories => {
      this.categories = [...categories, ...this.staticCategories];
    });
  }
}
