import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'del-button',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatButtonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() btnClass!: string;
  @Input() type = 'button';
  @Input() disabled = false;

  @Output() onClick = new EventEmitter();
}
