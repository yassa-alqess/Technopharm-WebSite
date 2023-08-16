import { Component, inject } from '@angular/core';
import { Orders } from 'core/interfaces/tranasactionHistory/transaction';
import { TransactionHistoryService } from 'core/services/transactionhistory/transaction-history.service';

@Component({
  selector: 'del-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  private transactionHistoryService = inject(TransactionHistoryService);

  orders: Orders[] = [];

  ngOnInit() {
    this.getOrdersHistory();
  }

  getOrdersHistory() {
    this.transactionHistoryService.getTransactionHistory().subscribe(response => this.orders = response);
    console.log(this.orders);
  }
}
