import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { ButtonComponent, InputTextComponent, TitleComponent } from 'shared/components';

@Component({
  selector: 'del-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    BaseSharedModule,
    InputTextComponent,
    ButtonComponent,
    TitleComponent
  ],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  createContactForm!: FormGroup;
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initCreateContactForm();
  }

  initCreateContactForm() {
    this.createContactForm = this.fb.group({
      Email: ["", [Validators.required, Validators.email]],
      Name: [""],
      MobilePhone: [""],
      Message: "",
    });
  }

  createAccount() {
    // let contactInfo = this.createContactForm.getRawValue();

    // contactInfo.Name = `${contactInfo.FirstName} ${contactInfo.LastName}`;
    // contactInfo.BirthDay = `/Date(${format(new Date(contactInfo.BirthDay), 'T')})/`;

    // contactInfo.Addresses = [contactInfo.Addresses];

    // const body: UserPayload = {
    //   contact: {
    //     ...this.authService.userContactPayload,
    //     ...contactInfo,
    //   }
    // };
  }

}

