import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

import { IOrder } from '../orders/order';


@Injectable({
    providedIn: 'root'
  })
export class CartService {
  
  private orderUrl = 'http://localhost:3000/orders/saveOrder';

  constructor(private http: HttpClient) { }

  postRequestData(url, params): Observable<any> {
   
    let httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json");
   
    let options = {
      headers: httpHeaders

    };
    //ur,/body,header
    return this.http
      .post(url, params, options).pipe(
        catchError(this.handleError)
      );
  }

  items = [];
    
  addToCart(product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}