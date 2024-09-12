import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/category.interface';


@Component({
  selector: 'app-categories-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.scss'
})
export class CategoriesSliderComponent implements OnInit{

  private readonly _CategoriesService = inject(CategoriesService);

  categoriesList : Category[] = [] as Category[]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: 8
      }
    },
    nav: true
  }

  getCategories(){
    this._CategoriesService.getCategories().subscribe({
      next:(res:any)=>{
        this.categoriesList = res.data;
      }
    })
  }

  ngOnInit(): void {
    this.getCategories();
  }


}
