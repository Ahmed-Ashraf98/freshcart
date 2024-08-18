import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient:HttpClient) { }

  getBrands(){
    return this._HttpClient.get(baseUrl+"brands");
  }  

}
