import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../../core/interfaces/product.interface';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{

  allBrands:Brand[]=[];

  constructor(private _BrandsService:BrandsService ){}
  ngOnInit(): void {
    this._BrandsService.getBrands().subscribe(
      { 
        next:(res:any)=> 
          {
            this.allBrands = res.data;
          },
        error: (err:any) => console.log(err),
        complete: () => console.log("Done")
      }
    )
  }


}
