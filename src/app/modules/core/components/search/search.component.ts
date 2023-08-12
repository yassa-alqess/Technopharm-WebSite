import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, finalize, map, startWith, switchMap } from 'rxjs/operators';

import { Product } from 'core/interfaces';
import { SearchService } from 'core/services/search/search.service';

@Component({
  selector: 'del-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private searchService = inject(SearchService);
  private _previousItems: Product[] = [];
  private _items!: Product[];
  private startIndex = 0;
  private endIndex = 10;
  private slicedItemsCount = 10;

  searchControl = new FormControl('');
  filteredItems: Product[] = [];
  isLoading = false;

  constructor() {
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      switchMap(searchKey => this.getItems(searchKey)),
    ).subscribe(items => this.filteredItems = items);
  }

  private getItems(searchKey: string | null) {
    this.isLoading = true;

    if (!searchKey) return of([]);

    const body = {
      search: searchKey
    };

    this.startIndex = 0;
    this.endIndex = 10;

    return this.searchService.getItemsSearch(body).pipe(
      map(items => {
        this._items = [...items];
        return this.slice(this._items);
      }),
      finalize(() => {
        this.isLoading = false;
        if (this.filteredItems.length) this.onSearchResultsScroll();
      })
    );
  }

  private onSearchResultsScroll() {
    const searchWrapper = document.querySelector('.mat-mdc-autocomplete-panel');

    searchWrapper?.addEventListener('scroll', (event: Event) => {
      if (!this.filteredItems.length) return;

      const target = (event.target as HTMLElement);

      if (target.offsetHeight + target.scrollTop >= target.scrollHeight - 1) {
        this.startIndex += this.slicedItemsCount;
        this.endIndex += this.slicedItemsCount;

        this._previousItems = [
          ...this._previousItems,
          ...this.slice(this._items)
        ];

        this.filteredItems = this._previousItems;
      }
    });
  }

  private slice(items: Product[]) {
    const _items = JSON.parse(JSON.stringify(items));
    return _items.slice(this.startIndex, this.endIndex);
  }
}
