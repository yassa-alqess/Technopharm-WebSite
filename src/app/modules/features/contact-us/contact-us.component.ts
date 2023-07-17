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
  createContactUsForm!: FormGroup;
  fb = inject(FormBuilder);

  DelmarAddress: string = "المملكة العربية المتحدة ٫ شارع المدينة المنورة ٫ بجوار شركة جوالي";
  DelmarMobile: string = "+91 123 - 456 - 7890";
  DelmarEmail: string = "Delmar & Attalla@gmail.com";
  OtherAddress: string = "المملكة العربية المتحدة ٫ شارع المدينة المنورة ٫ بجوار شركة جواليs";


  ngOnInit(): void {
    this.initCreateContactUsForm();
  }

  initCreateContactUsForm() {
    this.createContactUsForm = this.fb.group({
      Email: ["", [Validators.required, Validators.email]],
      Name: [""],
      MobilePhone: [""],
      Message: "",
    });
  }

  send() {
    console.log(this.createContactUsForm);
  }

}

