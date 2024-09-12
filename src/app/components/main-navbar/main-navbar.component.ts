import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-main-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.scss'
})
export class MainNavbarComponent implements OnInit{
  
  
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  cartCounter = 0;
  wishlistCounter=0;

  clearToken(){ // for logout button
    localStorage.removeItem("token");
  }

  getLoggedInUserCart(){
    this._CartService.getLoggedInUserCart().subscribe({
      next:(res)=>{
        this.cartCounter = res.numOfCartItems;
      }
    })
  }

  getAllWishlistProducts(){
    this._WishlistService.getWishlistItems().subscribe({
      next:(res:any)=>{
        this.wishlistCounter= res.data.length;
      }
    })
  }

  cartCountNumListener(){
    this._CartService.cartCounter.subscribe({
      next:(count)=>{
        this.cartCounter = count;
      }
     });
  }


  wishlistCountNumListener(){
    this._WishlistService.wishlistCounter.subscribe({
      next:(count)=>{
        this.wishlistCounter = count;
      }
     });
  }


  ngOnInit(): void {

    this.getLoggedInUserCart();
    this.getAllWishlistProducts();

    this.cartCountNumListener();
    this.wishlistCountNumListener();
  }

}
