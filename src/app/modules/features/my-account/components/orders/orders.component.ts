import { Component, inject } from '@angular/core';
import { format } from 'date-fns';

import { Order } from 'core/interfaces';
import { SalesEntryStatus } from 'core/enums';
import { TransactionHistoryService } from 'core/services';

interface OrderStatus {
  [key: number]: { name: string; color: string; bg: string; };
}

@Component({
  selector: 'del-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  private transactionHistoryService = inject(TransactionHistoryService);

  orders: Order[] = [];
  isEnglish = false;

  orderStatus: OrderStatus = {
    [SalesEntryStatus.Cancelled]: {
      name: 'ORDER.STATUS.CANCELLED',
      color: 'text-error',
      bg: 'bg-error'
    },
    [SalesEntryStatus.Delivered]: {
      name: 'ORDER.STATUS.DELIVERED',
      color: 'text-success',
      bg: 'bg-success'
    },
    [SalesEntryStatus.Driver_Assigned]: {
      name: 'ORDER.STATUS.DRIVER',
      color: 'text-pending',
      bg: 'bg-pending'
    },
    [SalesEntryStatus.Picking_Staff_Assigned]: {
      name: 'ORDER.STATUS.PICKING',
      color: 'text-pending',
      bg: 'bg-pending'
    },
    [SalesEntryStatus.Received_By_Store]: {
      name: 'ORDER.STATUS.STORE',
      color: 'text-pending',
      bg: 'bg-pending'
    },
    [SalesEntryStatus.Released]: {
      name: 'ORDER.STATUS.RELEASED',
      color: 'text-middle',
      bg: 'bg-middle'
    }
  };

  ngOnInit() {
    this.getOrdersHistory();
  }

  getOrdersHistory() {
    this.transactionHistoryService.getTransactionHistory().subscribe(response => this.orders = response);
  }

  getOrderDate(birthDay: string) {
    const date = birthDay.match(/(\((.*)\+)/);
    if (!date) return '';

    return format(new Date(Number(date.pop())), 'dd/MM/yyyy');
  }

  formatNumber(number: number) {
    return new Intl.NumberFormat(`${this.isEnglish ? 'en' : 'ar'}-EG`, { style: 'currency', currency: 'EGP' }).format(number);
  }
}
