import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product.interface';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  isLoading:boolean=true;
  allProducts:Product[]=[];
  private readonly _ProductsService = inject(ProductsService);
  private readonly _Router = inject(Router);
  private readonly _CartService = inject(CartService);


  addProductToCart(event:MouseEvent,productId:string){
    event.stopPropagation();
    this._CartService.addProductToCart(productId).subscribe({
      next:(res)=>{
        console.log(res)
      }
    })
  }

  showProductDetails(productId:string){
    this._Router.navigate([`product-details/${productId}`])
  }

  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe(
      { 
        next:(res:any)=> 
          {
            this.isLoading = false;
            this.allProducts = res.data;
          },
        error: (err:any) => console.log(err),
        complete: () => console.log("Done")
      }
    )
  }

}
