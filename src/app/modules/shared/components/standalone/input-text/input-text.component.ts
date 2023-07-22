import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ValidationHandlerPipe } from 'shared/sub-modules/pipes';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'del-input-text',
    standalone: true,
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, TranslateModule, MatInputModule, ValidationHandlerPipe]
})
export class InputTextComponent {

  @Input() formGroup!: FormGroup;
  @Input() controlName = '';
  @Input() label = '';
  @Input() inputType = 'textbox';
  @Input() contentType = 'text';
  @Input() appearance!: MatFormFieldAppearance;
  @Input() readonly = false;
  @Input() textareaRows = '';

  constructor() { }

  ngOnInit(): void { }
}
