import { NgModule } from '@angular/core';
import { OrderListComponent } from './order-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    OrderListComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'orders', component: OrderListComponent },
      {
        path: 'orders/:id',
        component: OrderListComponent
      }
    ]),
    SharedModule
  ]
})
export class OrderModule { }
