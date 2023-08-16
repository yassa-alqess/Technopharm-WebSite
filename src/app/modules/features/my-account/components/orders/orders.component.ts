import { Component } from '@angular/core';

@Component({
  selector: 'del-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  rating: number = 3.5;

  calculateStarWidth(): string {
    const starWidth = (this.rating * 20) + '%';
    return starWidth;
  }
}
