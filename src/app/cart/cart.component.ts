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
  plus(){
    if(this.i !=10){
      this.i++;
      this.quantity = this.i;
    }
  }

  minus(){
    if(this.i !=0){
      this.i--;
      this.quantity = this.i;
    }
  }

}