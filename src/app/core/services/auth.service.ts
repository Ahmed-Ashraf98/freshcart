import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../environment/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _HttpClient = inject(HttpClient);

  signUp(data:any){
    return this._HttpClient.post(baseUrl+"auth/signup",data);
  }

  login(data:any){
    return this._HttpClient.post(baseUrl+"auth/signin",data);
  }
  
}
