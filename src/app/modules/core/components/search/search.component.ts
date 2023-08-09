import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchResult } from 'core/interfaces/search/search';
import { SearchService } from 'core/services/search/search.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface State {
  flag: string;
  name: string;
  population: string;
}
@Component({
  selector: 'del-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private searchService = inject(SearchService);

  stateCtrl = new FormControl('');
  // filteredStates: Observable<SearchResult[]>;

  items: SearchResult[] = [];



  // constructor() {
  //   this.filteredStates = this.stateCtrl.valueChanges.pipe(
  //     startWith(''),
  //     map(item => (item ? this._filterStates(item) : this.items.slice())),
  //   );
  // }

  // private _filterStates(value: string): SearchResult[] {
  //   const filterValue = value.toLowerCase();
  //   const body = {
  //     search: filterValue
  //   };

  //   this.searchService.getItemsSearch(body).subscribe(response => this.items = response);
  //   return this.items.filter(state => state.Items.Descriotion.toLowerCase().includes(filterValue));
  // }

}
