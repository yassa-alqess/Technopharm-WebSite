import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { ButtonComponent, InputTextComponent, TitleComponent } from 'shared/components';
import { th } from 'date-fns/locale';

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
  private fb = inject(FormBuilder);

  contactUsForm!: FormGroup;

  mainAddress = {
    name: 'المملكة العربية المتحدة ٫ شارع المدينة المنورة ٫ بجوار شركة جوالي',
    mobile: '+91 123 - 456 - 7890',
    email: 'Delmar & Attalla@gmail.com',
    otherAddress: 'المملكة العربية المتحدة ٫ شارع المدينة المنورة ٫ بجوار شركة جوالي',
  }

  ngOnInit(): void {
    this.initContactUsForm();
  }

  initContactUsForm() {
    this.contactUsForm = this.fb.group({
      Email: ["", [Validators.required, Validators.email]],
      Name: [""],
      MobilePhone: [""],
      Message: [""],
    });
  }

  send() {
    console.log(this.contactUsForm.value);
  }
}

