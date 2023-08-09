import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { SearchResult } from 'core/interfaces/search/search';


@Injectable({
  providedIn: 'root'
})
export class SearchService extends HttpService {

  getItemsSearch(body: { search: string, searchTypes?: number; }) {
    body.searchTypes = 1;
    return this.post<SearchResult[]>({ APIName: 'Search', body }).pipe();
  }

}
