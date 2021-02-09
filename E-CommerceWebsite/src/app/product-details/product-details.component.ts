import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../products';
import { CartService } from "../cart.service";



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product;

  constructor(
    private route: ActivatedRoute,
    private cart: CartService,
    ) { }



    addToCart(product){
      this.cart.setItem(product);
      window.alert(product.name + " has been added to the cart !");
    }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      this.product = products[+params.get('productId')];


    })
  }

}
