import { Component, OnInit } from '@angular/core';

import { IOrder } from './order';
import { OrderService } from './order.service';

@Component({
  selector: 'pm-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  pageTitle = 'Order List';
  errorMessage = '';
  
  orders: IOrder[] = [];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: orders => {
        this.orders = orders;
      },
      error: err => this.errorMessage = err
    });
  }

}
