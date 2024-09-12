import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../environment/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient = inject(HttpClient);
  cartCounter : BehaviorSubject<number> = new BehaviorSubject(0);

  headers = {
    token : localStorage.getItem("token")!
  }

  addProductToCart(productId:string):Observable<any>{
    return this._HttpClient.post(baseUrl+"cart",{productId},{
      headers: {
        ...this.headers
      }
    })
  }

  updateCartProductQTY(productId:string,count:number):Observable<any>{
    return this._HttpClient.put(`${baseUrl}cart/${productId}`,{count},{
      headers: {
        ...this.headers
      }
    })
  }

  getLoggedInUserCart():Observable<any>{
    return this._HttpClient.get(`${baseUrl}cart`,{
      headers: {
        ...this.headers
      }
    })
  }

  removeCartItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`${baseUrl}cart/${productId}`,{
      headers: {
        ...this.headers
      }
    })
  }
  
  clearUserCart():Observable<any>{
    return this._HttpClient.delete(`${baseUrl}cart`,{
      headers: {
        ...this.headers
      }
    })
  }

}
