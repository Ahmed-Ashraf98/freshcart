import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) : boolean | any => {

  const _Router = inject(Router);
  const _Auth = inject(AuthService);
  let token = localStorage.getItem("token");


console.log("------------------- Start To Validate Token -----------------")

  if(token){

    _Auth.validateToken(token).subscribe({
      next:(res:any)=>{
          console.log("Token Valid ==> ", res.message == "verified")
          console.log("------------------- End To Validate Token -----------------")
          return true;
      },error:(err)=>{
        console.log("Token Not Valid  ==> ", err)
        localStorage.clear();
        _Router.navigate(["signin"]);
        console.log("------------------- End To Validate Token -----------------")
        return false; // incase error while calling API
      }
    })

  }else{
    localStorage.clear();
    _Router.navigate(["signin"]);
    console.log("------------------- End To Validate Token -----------------")
    return false;
  }
  
};
