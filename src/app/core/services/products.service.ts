import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }

  getProducts(){
    return this._HttpClient.get(baseUrl+"products");
  } 

  getProductById(productId:string){
    return this._HttpClient.get(baseUrl+"products/"+productId);
  }

}
