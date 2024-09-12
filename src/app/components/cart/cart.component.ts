import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/interfaces/cart.interface';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../shared/ui/loader/loader.component';
import { ToasterManagerComponent } from '../../shared/ui/toaster-manager/toaster-manager.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent implements OnInit {

  private readonly _CartService = inject(CartService);
  private readonly _Router = inject(Router);

  isLoading:boolean = true;
  cartObj : Cart = {} as Cart;
  toasterManger = new ToasterManagerComponent();


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
    this.isLoading= true;
    this._CartService.removeCartItem(productId).subscribe({
      next :(res)=>{
        this._CartService.cartCounter.next(res.numOfCartItems)
        this.toasterManger.showInfo("Product Removed from the Cart");
        this.getLoggedInUserCart();
        

      },
      error:(err:any)=>{
        this.toasterManger.showError("Error: "+err.error.message)
      }
    })
  }

  updateProductQTY(selectEle:any,productId:string){
    this.isLoading= true;
    let selectVal = selectEle.value;
    this._CartService.updateCartProductQTY(productId,selectVal).subscribe({
      next:(res)=>{
        this.getLoggedInUserCart();
      },
      error:(err:any)=>{
        this.toasterManger.showError("Error: "+err.error.message)
      }
    })
  }

  ngOnInit(): void {
   this.getLoggedInUserCart();
  }

}
