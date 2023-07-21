import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';

import { UserPayload } from 'core/interfaces';
import { AuthService } from 'core/services/auth/auth.service';
import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { InputTextComponent, DropdownComponent, ButtonComponent, AccountInfoFormComponent, AccountAddressFormComponent } from 'shared/components';

@Component({
  selector: 'del-complete-registration',
  standalone: true,
  imports: [
    CommonModule,
    BaseSharedModule,
    MatDialogModule,
    AccountInfoFormComponent,
    AccountAddressFormComponent,
    InputTextComponent,
    ButtonComponent,
    DropdownComponent,
  ],
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.scss']
})
export class CompleteRegistrationComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  createAccountForm!: FormGroup;

  get Addresses() {
    return this.createAccountForm.get('Addresses') as FormGroup;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initCreateAccountForm();
  }

  initCreateAccountForm() {
    this.createAccountForm = this.fb.group({
      FirstName: ["", [Validators.required]],
      LastName: ["", [Validators.required]],
      Email: ["", [Validators.required, Validators.email]],
      Name: [""],
      Phone: [this.authService.userPhone],
      MobilePhone: [this.authService.userPhone],
      UserName: [this.authService.userPhone],
      Password: [this.authService.userPhone],
      BirthDay: ["", [Validators.required]],
      Gender: [null, [Validators.required]],
      Addresses: this.fb.group({
        Id: "",
        Number: [this.authService.userPhone],
        PhoneNumber: [this.authService.userPhone],
        CellPhoneNumber: [this.authService.userPhone],
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
