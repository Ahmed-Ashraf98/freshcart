import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../environment/environment.prod';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);

  signUp(data:any){
    return this._HttpClient.post(baseUrl+"auth/signup",data);
  }

  login(data:any){
    return this._HttpClient.post(baseUrl+"auth/signin",data);
  }

  checkUserToken(){

   let token = localStorage.getItem("token");

   if(token){

      try{
        
        let originalVal = jwtDecode(token);
        console.log(originalVal);
    
      }catch(error){
        localStorage.clear();
        this._Router.navigate(["./signin"]);
      }
    
    }

  }
  
}
