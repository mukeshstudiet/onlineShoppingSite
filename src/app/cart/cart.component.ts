import { Component ,OnInit} from '@angular/core';
import { CartService } from './cart.service';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
    items = this.cartService.getItems();
    products=[];
    constructor(
        private cartService: CartService, private productService: ProductService
      ) { }

      ngOnInit(): void {
      
        this.productService.products.subscribe((product) => {
          console.log("from cart page",product);
          this.products=product;
        });
      }

  quantity:number=0;

  i=0;
  
   plus(product) {
    if (product.quantity != 10) {
      product.quantity = product.quantity + 1;
      //  this.i++;
      // this.quantity = this.i;
    }
  }

  minus(product) {

    if (product.quantity != 0) {
      product.quantity = product.quantity - 1;
      // this.i--;
      //this.quantity = this.i;
    }

  }
  
  
    checkoutFinal() {

    let total = 0,  //set a variable that holds our total
      i;
    for (i = 0; i < this.products.length; i++) {  //loop through the array
      total += this.products[i].price * this.products[i].quantity;  //Do the math!
    }

    let orderFinal = { "orderDate": moment(new Date()).format('D MMM YYYY'), "orderCost": total.toFixed(2) }

    console.log(orderFinal);

  }

}
