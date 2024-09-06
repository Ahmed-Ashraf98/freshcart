import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly _HttpClient = inject(HttpClient); 

  headers = {
    token : localStorage.getItem("token")!
  }

  getWishlistItems():Observable<any>{
    return this._HttpClient.get(baseUrl+"wishlist",{
      headers:{...this.headers}
    })
  }

  addItemToWishlist(productId:string):Observable<any>{
    return this._HttpClient.post(baseUrl+"wishlist",{productId},{
      headers:{...this.headers}
    })
  }

  removeItemFromWishlist(productId:string):Observable<any>{
    return this._HttpClient.delete(baseUrl+"wishlist/"+productId,{
      headers:{...this.headers}
    })
  }


}
