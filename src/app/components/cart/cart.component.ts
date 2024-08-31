import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/interfaces/cart.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent implements OnInit {

  private readonly _CartService = inject(CartService);
  private readonly _Router = inject(Router);

  isLoading:boolean = true;
  cartObj : Cart = {} as Cart;

  getLoggedInUserCart(){
    this._CartService.getLoggedInUserCart().subscribe({
      next:(res)=>{
        this.isLoading = false;
        this.cartObj = res;
      }
    })
  }

  checkOut(cartId:string){
    this._Router.navigate(["shipping-address/"+cartId]);
  }

  removeItemFromCart(productId:string){
    this._CartService.removeCartItem(productId).subscribe({
      next :(res)=>{
        //TODO: Check Quantity in response of update quantity
        this.getLoggedInUserCart()
      }
    })
  }

  updateProductQTY(selectEle:any,productId:string){
    let selectVal = selectEle.value;
    this._CartService.updateCartProductQTY(productId,selectVal).subscribe({
      next:(res)=>{
        //TODO: Check Quantity in response of update quantity
        this.getLoggedInUserCart()
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }

  ngOnInit(): void {
   this.getLoggedInUserCart();
  }

}
