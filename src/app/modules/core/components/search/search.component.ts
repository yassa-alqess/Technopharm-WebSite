import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Product } from 'core/interfaces';
import { SearchService } from 'core/services/search/search.service';
import { Observable, of } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'del-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private searchService = inject(SearchService);

  searchControl = new FormControl('');
  filteredItems: Observable<Product[]>;

  constructor() {
    this.filteredItems = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      switchMap(searchKey => this.getItems(searchKey)),
    );
  }

  private getItems(searchKey: string | null) {
    if (!searchKey) return of([]);

    const body = {
      search: searchKey
    };

    return this.searchService.getItemsSearch(body);
  }
}
