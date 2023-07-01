import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'del-radio-button',
  standalone: true,
  imports: [CommonModule, BaseSharedModule, MatRadioModule],
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent {
  
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';

  @Input() label = 'Date';
  @Input() options!: { id: number | string; text: string }[];
}
