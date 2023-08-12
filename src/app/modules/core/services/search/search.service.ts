import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { SearchResponse } from 'core/interfaces/search/search';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService extends HttpService {

  getItemsSearch(body: { search: string; contactId?: string; searchTypes?: number; isLoading?: boolean; }) {
    body.contactId = "CT01286651";
    body.searchTypes = 1;
    body.isLoading = false;

    return this.post<SearchResponse>({ APIName: 'Search', body }).pipe(
      map(response => response.SearchResult.Items)
    );
  }

}
