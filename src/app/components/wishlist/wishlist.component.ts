import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from '../../shared/ui/loader/loader.component';
import { WishlistService } from '../../core/services/wishlist.service';
import { Product } from '../../core/interfaces/product.interface';
import { CartService } from '../../core/services/cart.service';
import { ToasterManagerComponent } from '../../shared/ui/toaster-manager/toaster-manager.component';

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
  toasterManger = new ToasterManagerComponent();


  getAllWishlistProducts(){
    this.isLoading = true;
    this._WishlistService.getWishlistItems().subscribe({
      next:(res:any)=>{
        this.allWishlistProducts = res.data;
        this._WishlistService.wishlistCounter.next(this.allWishlistProducts.length)
        this.isLoading = false;
      },error:(err)=>{
        this.toasterManger.showError("Error: "+err.error.message)
        this.isLoading = false;
      }
    })
  }

  removeItemFromWishlist(productId:string){
    this.isLoading = true;
    this._WishlistService.removeItemFromWishlist(productId).subscribe({
      next:(res:any)=>{
        this.getAllWishlistProducts();
        this.toasterManger.showInfo("Product Removed from Wishlist");
      },
      error:(err:any)=>{
        this.toasterManger.showError("Error: "+err.error.message)
        this.isLoading = false;
      }
    })
  }

  addProductToCart(productId:string){
    this.isLoading = true;
    this._CartService.addProductToCart(productId).subscribe({
      next:(res:any)=>{
        this._CartService.cartCounter.next(res.numOfCartItems);
        this.removeItemFromWishlist(productId);
        this.toasterManger.showSuccess("Product Added in Cart Successfully");
      },
      error:(err:any)=>{
        this.toasterManger.showError("Error: "+err.error.message)
        this.isLoading = false;
      }
    })
  }

  ngOnInit(): void {
    this.getAllWishlistProducts();
  }


}
