import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {


  allProducts:Product[]=[];
  
  constructor(private _ProductsService:ProductsService){}

  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe(
      { 
        next:(res:any)=> 
          {
            this.allProducts = res.data;
          },
        error: (err:any) => console.log(err),
        complete: () => console.log("Done")
      }
    )
  }

}
