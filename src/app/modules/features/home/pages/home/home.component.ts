import { Component } from '@angular/core';
import { HomeService } from 'features/home/services/home/home.service';

@Component({
  selector: 'del-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  banners: string[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getBanners();
  }

  getBanners() {
    this.homeService.banners.subscribe(banners => {
      this.banners = banners
    })
  }
}
