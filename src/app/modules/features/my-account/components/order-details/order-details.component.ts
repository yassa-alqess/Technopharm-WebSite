import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'core/interfaces';
import { TransactionHistoryService } from 'core/services';

@Component({
  selector: 'del-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  private transactionHistoryService = inject(TransactionHistoryService);
  private activatedRoute = inject(ActivatedRoute);

  order!: Order;

  ngOnInit() {
    this.getOrderDetails();
  }

  getOrderDetails() {
    const body = {
      entryId: this.activatedRoute.snapshot.queryParamMap.get('orderId') as string
    };

    this.transactionHistoryService.getTransactionHistoryDetails(body).subscribe(response => this.order = response);
  }
}
