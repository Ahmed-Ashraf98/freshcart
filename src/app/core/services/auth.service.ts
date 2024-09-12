import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../environment/environment.prod';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
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

  validateToken(token:string){
    return this._HttpClient.get(baseUrl+"auth/verifyToken",{headers:{token}})
  }


  forgotPassword(data:any){
    return this._HttpClient.post(baseUrl+"auth/forgotPasswords",data);
  }

  verifyResetCode(data:any){
    return this._HttpClient.post(baseUrl+"auth/verifyResetCode",data);
  }

  
  updateLoggedUserPassword(data:any){
    return this._HttpClient.put(baseUrl+"auth/resetPassword",data);
  }
  
}
