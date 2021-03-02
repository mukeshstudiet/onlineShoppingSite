import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IOrder } from '../orders/order';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class CartService {

  items = [];
  constructor(private http: HttpClient) { }

  postRequestData(url, params): Observable<any> {
    let httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json");

    let options = {
      headers: httpHeaders
    };

    return this.http
      .post(url, params, options).pipe(
        catchError(this.handleError)
      );
  }

  addToCart(product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
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