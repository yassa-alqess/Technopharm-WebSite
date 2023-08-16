import { Injectable, inject } from '@angular/core';
import { HttpService } from '../http/http.service';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TransactionHistory } from 'core/interfaces/tranasactionHistory/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryService extends HttpService {
  private authService = inject(AuthService);

  getTransactionHistory(body: { cardId: string; maxNumberOfTransactions: number; } = {
    cardId: "HOCT01270447",
    maxNumberOfTransactions: 10,
  }) {
    return this.post<TransactionHistory>({ APIName: 'SalesEntriesGetByCardId', body }).pipe(
      map(response => response.TransactionHistory),

    );
  }
}
