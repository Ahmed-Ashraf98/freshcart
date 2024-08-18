import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient) { }
  
  getCategories(){
    return this._HttpClient.get(baseUrl+"categories");
  }  

}
