import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from '../input-text/input-text.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'core/services';

@Component({
  selector: 'del-account-info-form',
  standalone: true,
  imports: [CommonModule, TranslateModule, InputTextComponent, DatepickerComponent, RadioButtonComponent],
  templateUrl: './account-info-form.component.html',
  styleUrls: ['./account-info-form.component.scss']
})
export class AccountInfoFormComponent {
  private authService = inject(AuthService);

  genders = this.authService.genders;
  today = new Date();

  @Input() formGroup!: FormGroup;
}
