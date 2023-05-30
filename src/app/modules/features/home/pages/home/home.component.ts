import { Component } from '@angular/core';
import { Advertisement, Offer, Product } from 'core/interfaces';
import { HomeService } from 'features/home/services/home/home.service';

@Component({
  selector: 'del-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  banners: Advertisement[] = [];
  bestSelerItems: Product[] = [];
  offers: Offer[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getHomeBanners();
    this.getBestSellerItems();
    this.getOffers();
  }

  getHomeBanners() {
    this.homeService.getBanners().subscribe(banners => this.banners = banners);
  }

  /**
   * get bestSellerItems from the server side
   */
  getBestSellerItems() {
    this.homeService.getBestSellerItems().subscribe(bestSelerItems => this.bestSelerItems = bestSelerItems);
  }

  /**
   * get offers from the server side
   */
  getOffers() {
    this.homeService.getOffers().subscribe(offers => this.offers = offers);
  }
}
