import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { InputTextComponent } from '../input-text/input-text.component';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { HomeService } from 'features/home/services/home/home.service';

@Component({
  selector: 'del-account-address-form',
  standalone: true,
  imports: [CommonModule, TranslateModule, InputTextComponent, DatepickerComponent, RadioButtonComponent, DropdownComponent],
  templateUrl: './account-address-form.component.html',
  styleUrls: ['./account-address-form.component.scss']
})
export class AccountAddressFormComponent {
  private homeService = inject(HomeService);

  cities: { id: number | string; text: string; }[] = [];
  areas: { id: number | string; text: string; }[] = [];

  @Input() formGroup!: FormGroup;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCities();
  }

  getCities() {
    this.homeService.getCities().subscribe(cities => {
      this.cities = cities.map(each => ({
        id: each.City,
        text: each.City
      }));

      this.formGroup.get('Country')?.setValue(cities[0].Country);

      // get areas based on city value.
      if (this.formGroup.get('City')?.value) this.getAreas(this.formGroup.get('City')?.value);
    });
  }

  getAreas(City: string) {
    this.homeService.getAreas({ City }).subscribe(areas => {
      this.areas = areas.map(each => ({
        id: each.Area,
        text: each.Area
      }));
    });
  }
}
