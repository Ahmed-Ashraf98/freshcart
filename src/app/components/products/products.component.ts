import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product.interface';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { LoaderComponent } from '../../shared/ui/loader/loader.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  isLoading:boolean=true;
  allProducts:Product[]=[];
  wishlistItems:string[]=[];
  private readonly _ProductsService = inject(ProductsService);
  private readonly _Router = inject(Router);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);

  addProductToCart(event:MouseEvent,productId:string){
    event.stopPropagation();
    this._CartService.addProductToCart(productId).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error: (err:any) => console.log(err)
    })
  }

  updateWishlistIcons(list:Product[]){
    for (let i = 0; i < list.length; i++) {
        this.wishlistItems.push(list[i].id);
    } 
  }

  getGetLoggedUserWishlist(){
    this._WishlistService.getWishlistItems().subscribe({
      next:(res:any)=>{
        this.isLoading = false;
        this.updateWishlistIcons(res.data)
      },
      error: (err:any) => console.log(err)
    })
  }

  wishlistToggler(event:MouseEvent,productId:string){
    event.stopPropagation();
    this.isLoading = true;
    if(this.wishlistItems.includes(productId)){
        this._WishlistService.removeItemFromWishlist(productId).subscribe({
          next:(res:any)=>{
            console.log(res)
            this.wishlistItems = [...res.data]
            this.isLoading = false;
          },
          error: (err:any) => console.log(err)
        })
    }else{

      this._WishlistService.addItemToWishlist(productId).subscribe({
        next:(res:any)=>{
  
          this.wishlistItems = [...res.data]
          this.isLoading = false;
        },
        error: (err:any) => console.log(err)
      })

    }

    
  }

  showProductDetails(productId:string){
    this._Router.navigate([`product-details/${productId}`])
  }


  getAllProducts(){
    this._ProductsService.getProducts().subscribe(
      { 
        next:(res:any)=> 
          {

            this.allProducts = res.data;
            this.getGetLoggedUserWishlist();
          },
        error: (err:any) => console.log(err)
      }
    )
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

}
