import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category, ProductGroup } from 'core/interfaces';
import { DirectivesModule } from 'shared/sub-modules/directives/directives.module';

@Component({
  selector: 'del-category',
  standalone: true,
  imports: [CommonModule, DirectivesModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  isEnglish = true;
  
  @Input() isSelected = false;
  @Input() category!: Category | ProductGroup;

  @Output() selectedCategory = new EventEmitter()

  select() {
    this.selectedCategory.emit(this.category);
  }
}
