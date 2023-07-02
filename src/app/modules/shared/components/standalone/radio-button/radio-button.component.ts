import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'del-radio-button',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, MatRadioModule],
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent {
  
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';

  @Input() label = 'Date';
  @Input() options!: { id: number | string; text: string }[];
}
