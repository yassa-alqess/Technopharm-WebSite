import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Component, Input } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';

import { BaseSharedModule } from 'shared/sub-modules/base-shared';
import { ValidationHandlerPipe } from 'shared/sub-modules/pipes';
import { format } from 'date-fns';

@Component({
  selector: 'del-datepicker',
  standalone: true,
  imports: [CommonModule, BaseSharedModule, ValidationHandlerPipe, MatDatepickerModule, MatInputModule, MatNativeDateModule],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {

  @Input() formGroup!: FormGroup;
  @Input() controlName = '';

  @Input() minDate!: Date;
  @Input() maxDate!: Date;
  @Input() label = 'Date';
  @Input() appearance: MatFormFieldAppearance = 'outline';

  constructor() { }

  ngOnInit(): void { }

  setDateValue(event: MatDatepickerInputEvent<any>) {
    const dateValue: Date = event.value;

    let dateYear = +format(dateValue, 'yyyy'),
      dateMonth = +format(dateValue, 'MM') - 1,
      dateDay = +format(dateValue, 'dd'),
      dateHours = +format(new Date(), 'HH'),
      dateMinutes = +format(new Date(), 'mm');

    const dateFormated = format(new Date(dateYear, dateMonth, dateDay, dateHours, dateMinutes), "yyyy-MM-dd'T'HH:mm:ssxxx");
    this.formGroup.get(this.controlName)?.setValue(dateFormated);
  }

  preventDefault(event: KeyboardEvent) {
    event.preventDefault();
  }
}
