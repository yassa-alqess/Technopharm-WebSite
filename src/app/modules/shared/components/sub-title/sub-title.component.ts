import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'del-sub-title',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './sub-title.component.html',
  styleUrls: ['./sub-title.component.scss']
})
export class SubTitleComponent {
  @Input() title!: string;
  @Input() fontSize = 'font-16';
}
