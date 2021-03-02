import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  errorMessage = '';
  product: IProduct | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }

    this.productService.products.subscribe((product) => {
      console.log("from product page",product);
    });
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  addToCart(product){
    if(this.quantity==0){
      alert("Please add quantity");
      return false;
    }
    product.quantity=this.quantity;
    this.productService.addProductToCart(product);
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
