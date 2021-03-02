import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators'

import { IOrder } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl = 'http://localhost:3000/orders/orderlist';
  constructor(private http: HttpClient) { }

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.orderUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getOrder(id: number): Observable<IOrder | undefined> {
    return this.getOrders()
      .pipe(
        map((orders: IOrder[]) => orders.find(o => o.orderId === id))
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
        let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
