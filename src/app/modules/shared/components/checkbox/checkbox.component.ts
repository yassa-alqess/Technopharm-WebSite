import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'del-checkbox',
  standalone: true,
  imports: [CommonModule, BaseSharedModule, MatCheckboxModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

  @Input() label = '';
  @Input() color = 'bg-primary';
  @Input() checked = false;
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';

  @Output() isChecked: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if (this.formGroup) this.checked = this.formGroup.get(this.controlName)?.value;
  }

  whenChecked(event: MatCheckboxChange) {
    if (this.formGroup) this.formGroup.get(this.controlName)?.setValue(event.checked);
    this.checked = event.checked;
    this.isChecked.emit(event.checked);
  }
}
