import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { ProductsComponent } from "../products/products.component";
import { MainSliderComponent } from '../main-slider/main-slider.component';
import { CategoriesSliderComponent } from "../categories-slider/categories-slider.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent, MainSliderComponent, CategoriesSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

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
    this.getCategories();
  }




}
