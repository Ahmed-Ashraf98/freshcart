import { Component, OnInit } from '@angular/core';
import { Category } from '../../core/interfaces/product.interface';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  allCategories:Category[]=[];

  constructor(private _CategoriesService: CategoriesService){}

  ngOnInit(): void {
    this._CategoriesService.getCategories().subscribe(
      { 
        next:(res:any)=> 
          {
            this.allCategories = res.data;
          },
        error: (err:any) => console.log(err),
        complete: () => console.log("Done")
      }
    )
  }

}
