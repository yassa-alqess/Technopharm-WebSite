import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { ValidationHandlerPipe } from 'shared/sub-modules/pipes';

@Component({
    selector: 'del-input-text',
    standalone: true,
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.scss'],
    imports: [CommonModule, BaseSharedModule, MatInputModule, ValidationHandlerPipe]
})
export class InputTextComponent {

  @Input() formGroup!: FormGroup;
  @Input() controlName = '';
  @Input() label = '';
  @Input() inputType = 'textbox';
  @Input() contentType = 'text';
  @Input() appearance!: MatFormFieldAppearance;
  @Input() readonly = false;

  constructor() { }

  ngOnInit(): void { }
}
