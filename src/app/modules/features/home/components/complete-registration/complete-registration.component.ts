import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';

import { UserPayload } from 'core/interfaces';
import { AuthService } from 'core/services/auth/auth.service';
import { HomeService } from 'features/home/services/home/home.service';
import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { InputTextComponent, DropdownComponent, ButtonComponent, AccountInfoFormComponent } from 'shared/components';

@Component({
  selector: 'del-complete-registration',
  standalone: true,
  imports: [
    CommonModule,
    BaseSharedModule,
    MatDialogModule,
    AccountInfoFormComponent,
    InputTextComponent,
    ButtonComponent,
    DropdownComponent,
  ],
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.scss']
})
export class CompleteRegistrationComponent {
  private authService = inject(AuthService);
  private homeService = inject(HomeService);
  private fb = inject(FormBuilder);

  createAccountForm!: FormGroup;

  today = new Date();
  cities: { id: number | string; text: string; }[] = [];
  areas: { id: number | string; text: string; }[] = [];

  get Addresses() {
    return this.createAccountForm.get('Addresses') as FormGroup;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initCreateAccountForm();
    this.getCities();
  }

  initCreateAccountForm() {
    this.createAccountForm = this.fb.group({
      FirstName: ["", [Validators.required]],
      LastName: ["", [Validators.required]],
      Email: ["", [Validators.required, Validators.email]],
      Name: [""],
      Phone: [{ value: this.authService.userPhone, disabled: true }],
      MobilePhone: [{ value: this.authService.userPhone, disabled: true }],
      UserName: [{ value: this.authService.userPhone, disabled: true }],
      Password: [{ value: this.authService.userPhone, disabled: true }],
      BirthDay: ["", [Validators.required]],
      Gender: [null, [Validators.required]],
      Addresses: this.fb.group({
        Id: "",
        PhoneNumber: [{ value: this.authService.userPhone, disabled: true }],
        CellPhoneNumber: [{ value: this.authService.userPhone, disabled: true }],
        ApartmentNo: [""],
        FloorNo: [""],
        Street: ["", [Validators.required]],
        HouseNo: ["", [Validators.required]],
        Country: [null, [Validators.required]],
        City: [null, [Validators.required]],
        Area: [null],
        Type: 0,
        LineNO: 0,
        Address1: "",
        Address2: "",
      }),
    });
  }

  getCities() {
    this.homeService.getCities().subscribe(cities => {
      this.cities = cities.map(each => ({
        id: each.City,
        text: each.City
      }));

      this.Addresses.get('Country')?.setValue(cities[0].Country);
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

  createAccount() {
    let contactInfo = this.createAccountForm.getRawValue();

    contactInfo.Name = `${contactInfo.FirstName} ${contactInfo.LastName}`;
    contactInfo.BirthDay = `/Date(${format(new Date(contactInfo.BirthDay), 'T')})/`;

    contactInfo.Addresses = [contactInfo.Addresses];

    const body: UserPayload = {
      contact: {
        ...this.authService.userContactPayload,
        ...contactInfo,
      }
    };

    // - User  already exists:
    this.authService.createAccount(body).subscribe(response => {
      localStorage.setItem("del-user-exist", "true");
      console.log(response);
    });
  }
}
