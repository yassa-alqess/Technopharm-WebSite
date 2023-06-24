import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Advertisement, Offer, Product } from 'core/interfaces';
import { HomeService } from 'features/home/services/home/home.service';

@Component({
  selector: 'del-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  dialog = inject(MatDialog);

  banners: Advertisement[] = [];
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
    this.getBestSellerItems();
    this.getOffers();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (!this.isUserExist)
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
