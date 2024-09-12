import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isLoggedInGuard: CanActivateFn = (route, state) :boolean | any => {
  
  const _Router = inject(Router);
  const _Auth = inject(AuthService);
  let token = localStorage.getItem("token");


console.log("------------------- Start To Validate Token -----------------")

  if(token){

    _Auth.validateToken(token).subscribe({
      next:(res:any)=>{
          console.log("Token Valid ==> ", res.message == "verified")
          console.log("------------------- End To Validate Token -----------------")
          _Router.navigate(["home"]);
          return false; //  Don't Go to [ Signup / Signin]
      },error:(err)=>{
        console.log("Token Not Valid  ==> ", err)
        console.log("------------------- End To Validate Token -----------------")
        return true; // incase error while calling API, go back to [ Signup / Signin]
      }
    })

  }else{
    console.log("------------------- End To Validate Token -----------------")
    return true; // incase token is null, go to [ Signup / Signin]
  }
  



  /*
  const _Router = inject(Router);

  if( localStorage.getItem("token") != null){
     _Router.navigate(["home"]);
     return false;
  }
  return true;
*/
};
