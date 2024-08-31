import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { ProductDetail } from '../../core/interfaces/product.interface';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);

  isLoading:boolean = true;
  productObj :ProductDetail = {} as ProductDetail;

  getProductDetails(productId:string){
    this._ProductsService.getProductById(productId).subscribe({
      next:(res:any)=>{
        this.isLoading = false;
        this.productObj = res.data;
      }
    })
  }

  addProductToCart(productId:string){
    this._CartService.addProductToCart(productId).subscribe({
      next:(res)=>{
        console.log(res)
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
