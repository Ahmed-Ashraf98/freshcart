import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product, ProductDetail } from '../../core/interfaces/product.interface';
import { CartService } from '../../core/services/cart.service';
import { ToasterManagerComponent } from '../../shared/ui/toaster-manager/toaster-manager.component';
import { WishlistService } from '../../core/services/wishlist.service';
import { LoaderComponent } from '../../shared/ui/loader/loader.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);

  isLoading:boolean = true;
  productObj :ProductDetail = {} as ProductDetail;
  toasterManger = new ToasterManagerComponent();
  wishlistItems:string[]=[];

  getProductDetails(productId:string){
    this._ProductsService.getProductById(productId).subscribe({
      next:(res:any)=>{
        this.isLoading = false;
        this.productObj = res.data;
      }
    })
  }

  wishlistToggler(event:MouseEvent,productId:string){
    event.stopPropagation();
    this.isLoading = true;
    if(this.wishlistItems.includes(productId)){
        this._WishlistService.removeItemFromWishlist(productId).subscribe({
          next:(res:any)=>{
            this.toasterManger.showInfo("Product Removed From Wishlist");
            this.wishlistItems = [...res.data]
            this._WishlistService.wishlistCounter.next(this.wishlistItems.length)
            this.isLoading = false;
          },
          error:(err)=>{
            this.toasterManger.showError("Error: "+err.error.message)
            this.isLoading = false;
          }
        })
    }else{

      this._WishlistService.addItemToWishlist(productId).subscribe({
        next:(res:any)=>{
          this.toasterManger.showSuccess("Product added successfully to Wishlist");
          this.wishlistItems = [...res.data]
          this._WishlistService.wishlistCounter.next(this.wishlistItems.length)
          this.isLoading = false;
        },error:(err)=>{
          this.toasterManger.showError("Error: "+err.error.message)
          this.isLoading = false;
        }
      })

    }

    
  }


  addProductToCart(productId:string){
    this._CartService.addProductToCart(productId).subscribe({
      next:(res)=>{
        this._CartService.cartCounter.next(res.numOfCartItems)
        this.toasterManger.showSuccess("Product Added in Cart Successfully");
      },
      error:(err:any)=>{
        this.toasterManger.showError("Error: "+err.error.message)
      }
    })
  }


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.getProductDetails(res.get("id")!);
      }
    })
  }

}
