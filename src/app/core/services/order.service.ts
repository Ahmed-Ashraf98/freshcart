import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../environment/environment.prod';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(ActivatedRoute);
  
  headers = {
    token : localStorage.getItem("token")!
  }


  createCheckoutSession(cartId:string,backUrl:string,shippingAddress:object){
    return this._HttpClient.post(baseUrl+"orders/checkout-session/"+cartId+"?url="+backUrl,{shippingAddress},{
      headers:{...this.headers}
    });
  }

}
