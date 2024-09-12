import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss'
})
export class ShippingAddressComponent {

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _OrderService = inject(OrderService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)

  shippingForm = this._FormBuilder.group({
    details : [""],
    phone : [""],
    city : [""],
  })


  getAppBaseUrl():string{
    return  location.port ? `http://${location.host}/` :`http://${location.host}/freshcart/#/home`;
  }


  createPaymentSeession(cartId:string){
    this._OrderService.createCheckoutSession(cartId,this.getAppBaseUrl(),this.shippingForm.value).subscribe({
      next:(res:any)=>{
        console.log(res)
        window.location.href=res.session.url;
      }
    })
  }

  payment(){
    this._ActivatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.createPaymentSeession(res.get("id")!)
      }
    })
    
  }

}
