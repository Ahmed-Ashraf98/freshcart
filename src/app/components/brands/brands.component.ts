import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../../core/interfaces/product.interface';
import { LoaderComponent } from '../../shared/ui/loader/loader.component';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
  isLoading:boolean = true;
  allBrands:Brand[]=[];

  constructor(private _BrandsService:BrandsService ){}
  ngOnInit(): void {
    this._BrandsService.getBrands().subscribe(
      { 
        next:(res:any)=> 
          {
            this.allBrands = res.data;
            this.isLoading=false;
          },
        error: (err:any) => console.log(err),
        complete: () => console.log("Done")
      }
    )
  }


}
