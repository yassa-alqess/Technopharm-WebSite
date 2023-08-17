import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from 'core/interfaces/';
import { TransactionHistoryService } from 'core/services/transactionhistory/transaction-history.service';

@Component({
  selector: 'del-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  private transactionHistoryService = inject(TransactionHistoryService);
  private activatedRoute = inject(ActivatedRoute);

  order!: OrderDetails;
  OrderId = "";

  ngOnInit() {

    this.getOrderDetails();
  }

  getOrderDetails() {
    this.OrderId = this.activatedRoute.snapshot.queryParamMap.get('ID') as string;
    const body = {
      entryId: this.OrderId
    };

    this.transactionHistoryService.getTransactionHistoryDetails(body).subscribe(response =>{ this.order = response; console.log(this.order)});
  }

}
