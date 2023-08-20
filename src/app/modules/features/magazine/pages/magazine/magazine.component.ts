import { Component, inject } from '@angular/core';
import { MagazineService } from '../../service/magazine.service';
import { Magazine } from 'core/interfaces';

@Component({
  selector: 'del-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.scss']
})
export class MagazineComponent {
  private magazineService = inject(MagazineService);

  magazines: Magazine[] = [];

  ngOnInit() {
    this.getMagazine();
  }

  getMagazine() {
    this.magazineService.magazines.subscribe(magazine => this.magazines = magazine);
  }

  setMagazinePlaceholderImage(magazine: Magazine) {
    const placeholderImage = 'assets/images/common/Pharmacy_Image_Placeholder.png';
    if (magazine.Image.length) {
      magazine.Image = placeholderImage;
    } else {
      magazine.Image = placeholderImage;
    }
  }
}
