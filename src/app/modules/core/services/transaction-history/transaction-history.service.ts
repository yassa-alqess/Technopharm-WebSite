import { Injectable, inject } from '@angular/core';
import { HttpService } from '../http/http.service';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TransactionHistoryResponse, TransactionHistoryDetails } from 'core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryService extends HttpService {
  private authService = inject(AuthService);

  getTransactionHistory(body: { cardId: string; maxNumberOfTransactions: number; } = {
    cardId: "HOCT01270447",
    maxNumberOfTransactions: 10,
  }) {
    return this.post<TransactionHistoryResponse>({ APIName: 'SalesEntriesGetByCardId', body }).pipe(
      map(response => response.SalesEntriesGetByCardIdResult),
    );
  }

  getTransactionHistoryDetails(body: { entryId: string; type?: number; }) {
    body.type = 2;

    return this.post<TransactionHistoryDetails>({ APIName: 'SalesEntryGet', body }).pipe(
      map(response => response.SalesEntryGetResult)
    ).pipe(
      map(response => {
        response.TaxAmount = response.Lines.reduce((initial, current) => initial + current.TaxAmount, 0);
        return response;
      })
    );
  }
}
