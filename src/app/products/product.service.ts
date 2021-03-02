import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from "../../environments/environment";

import { IProduct } from './product';

import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public cartItems = [];
  public products = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(environment.productListUri)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.productId === id))
      );
  }

  setProducts(products) {
    this.cartItems.push(...products);
    this.products.next(products);
  }

  
  addProductToCart(product) {
    let arr = this.cartItems;
    let isExist = arr.some(o => o.productName === product.productName && o.productId === product.productId);
    if (!isExist) {

    this.cartItems.push(product);
    this.cartItems.sort(this.sortByProperty("productId"));
    this.products.next(this.cartItems);
    
    }
    else {
   
    this.cartItems.splice(this.cartItems.findIndex(a => a.productId === product.productId), 1)
    this.cartItems.push(product);
    this.cartItems.sort(this.sortByProperty("productId"));
    this.products.next(this.cartItems);
    }
  }
  
  clearCart() {
    this.cartItems = [];
    this.products.next(this.cartItems);
  }

  sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
   
       return 0;  
    }  
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
