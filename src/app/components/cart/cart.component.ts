import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent implements OnInit {

  private readonly _CartService = inject(CartService);


  

  getLoggedInUserCart(){
    this._CartService.getLoggedInUserCart().subscribe({
      next:(res)=>{
        console.log(res)
      }
    })
  }

  ngOnInit(): void {
   this.getLoggedInUserCart();
  }

}
