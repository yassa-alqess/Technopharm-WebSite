import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormGroup } from '@angular/forms';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';

import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { ValidationHandlerPipe } from 'shared/sub-modules/pipes';

@Component({
  selector: 'del-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    BaseSharedModule,
    MatFormFieldModule,
    MatSelectModule,
    ValidationHandlerPipe
  ],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

  @Input() formGroup!: FormGroup;
  @Input() controlName = '';

  @Input() label = 'Date';
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() options!: { id: number | string; text: string; }[];

  @Output() selected = new EventEmitter();

  getSelectedValue(event: { source: MatSelect; value: string; }) {
    this.selected.emit(event.value);
  }
}