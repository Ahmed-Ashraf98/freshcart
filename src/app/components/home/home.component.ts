import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { ProductsComponent } from "../products/products.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly _AuthService = inject(AuthService);
  private readonly _Categories = inject(CategoriesService);
  private readonly _Products = inject(ProductsService);

  getCategories(){
    this._Categories.getCategories().subscribe({
      next:(res)=>{
        console.log(res)
      }
    })
  }

  getProducts(){
    this._Products.getProducts().subscribe({
      next:(res)=>{
        console.log(res);
      }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkUserToken();
    this.getCategories();
    // this.getProducts();
  }




}
