import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly _HttpClient = inject(HttpClient);
  
  headers = {
    token : localStorage.getItem("token")!
  }

  // createCashOrder(cartId:string,shippingAddress:object){
  //   return this._HttpClient.post(baseUrl+"orders/"+cartId,{shippingAddress},{
  //     headers:{...this.headers}
  //   });
  // }

  createCheckoutSession(cartId:string,shippingAddress:object){
    return this._HttpClient.post(baseUrl+"orders/checkout-session/"+cartId+"?url=http://localhost:4200",{shippingAddress},{
      headers:{...this.headers}
    });
  }

}
