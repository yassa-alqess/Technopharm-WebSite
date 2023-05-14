import { Component } from '@angular/core';
import { Category } from 'core/interfaces';
import { CategoriesService } from 'core/services';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'del-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.scss']
})
export class HomeCategoriesComponent {
  isEnglish = false;
  categories: Category[] = [];

  config: SwiperOptions = {
    loop: true,
    spaceBetween: 1,
    slidesPerView: 1,
    pagination: false,
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
      lockClass: 'd-none'
    },
    breakpoints: {
      992: {
        slidesPerView: 5,
        spaceBetween: 15,
        centeredSlides: false,
      },
      685: {
        slidesPerView: 3,
        spaceBetween: 15,
        centeredSlides: false,
      },
    }
  };

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
    this.categoriesService.categories.subscribe(categories => this.categories = categories);
  }
}
