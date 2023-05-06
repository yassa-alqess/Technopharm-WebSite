import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';

@Component({
  selector: 'del-pagination',
  standalone: true,
  imports: [CommonModule, NgbPagination, BaseSharedModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  currentPage = 1;
  isEnglish = false;

  @Input() totalCount!: number;
  @Input() pageSize!: number;

  @Output() pageSelected: EventEmitter<number> = new EventEmitter();

  constructor() { }

  onPageChange(pageNumber: number) {
    this.pageSelected.emit(pageNumber);
  }
}
