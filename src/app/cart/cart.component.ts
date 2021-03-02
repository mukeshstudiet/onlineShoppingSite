import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { ProductService } from '../products/product.service';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from "../../environments/environment";



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items = this.cartService.getItems();
  products = [];
  totalAmount: any;
  constructor(
    private cartService: CartService, private productService: ProductService, private router: Router
  ) { }

  ngOnInit(): void {

    this.productService.products.subscribe((product) => {
      this.products = product;
      this.totalProductAmount();
    });
  }

  quantity: number = 0;

  i = 0;

  plus(product) {
    if (product.quantity != 10) {
      product.quantity = product.quantity + 1;
    }
    this.totalProductAmount();
  }

  minus(product) {

    if (product.quantity != 0) {
      product.quantity = product.quantity - 1;
    }
    this.totalProductAmount();

  }


  checkoutFinal() {

    let total = 0,
      i;
    for (i = 0; i < this.products.length; i++) {  
      total += this.products[i].price * this.products[i].quantity;  
    }

    let orderFinal = { "orderDate": moment(new Date()).format('D MMM YYYY'), "orderCost": total.toFixed(2) }

    this.cartService.postRequestData(environment.postOrderUri, orderFinal).subscribe(data => {
      if (data.msg == "SUCCESS") {
        this.productService.clearCart();
        this.router.navigate(['orders']);

      } else {
        alert("Error ocurred")
      }
      
    })

  }

  deleteProduct(product) {
    this.products.splice(this.products.findIndex(a => a.productId === product.productId), 1);
    this.totalProductAmount();

  }

  totalProductAmount() {
    let total = 0, i; 
    for (i = 0; i < this.products.length; i++) {  
      total += this.products[i].price * this.products[i].quantity;  
    }

    this.totalAmount = total.toFixed(2);
  }

}
