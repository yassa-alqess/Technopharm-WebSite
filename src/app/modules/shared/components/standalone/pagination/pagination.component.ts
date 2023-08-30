import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from 'shared/sub-modules/directives/directives.module';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'del-pagination',
  standalone: true,
  imports: [CommonModule, DirectivesModule, ButtonComponent],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pageNumber = 1;
  @Input() totalCount = 0;

  @Output() pageSelected: EventEmitter<number> = new EventEmitter();

  onPageChange(pageNumber: number) {
    this.pageSelected.emit(pageNumber);
  }
}
