import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from '../shared/ui/loader/loader.component';
import { WishlistService } from '../core/services/wishlist.service';
import { Product } from '../core/interfaces/product.interface';
import { CartService } from '../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})

export class WishlistComponent implements OnInit{


  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)

  isLoading:boolean = true;
  allWishlistProducts :Product[] = [] as Product[];


  getAllWishlistProducts(){
    this._WishlistService.getWishlistItems().subscribe({
      next:(res:any)=>{
        this.allWishlistProducts = res.data;
        this.isLoading = false;
      }
    })
  }

  removeItemFromWishlist(productId:string){
    this._WishlistService.removeItemFromWishlist(productId).subscribe({
      next:(res:any)=>{
        this.isLoading = true;
        this.getAllWishlistProducts();
      }
    })
  }

  addProductToCart(productId:string){
    this._CartService.addProductToCart(productId).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.removeItemFromWishlist(productId);
      }
    })
  }

  ngOnInit(): void {
    this.getAllWishlistProducts();
  }


}
