import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastErrorComponent } from "../../shared/ui/toast-error/toast-error.component";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ToastErrorComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  
  private readonly _auth = inject(AuthService);
  private readonly _router = inject(Router);



  showErrorPopUp:boolean = false
  errObj?:any;

  loginForm = new FormGroup({

    email:new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),

  },)

  loginIntoApp(){
    this._auth.login(this.loginForm.value).subscribe({
      next:(res:any)=> {
        this.saveTokenInLocalStorage(res.token)
        this._auth.checkUserToken();
        this._router.navigate(['home'])
      },
      error:(error)=> {
        console.log(error)
        this.showErrorPopUp = true;
        this.errObj = error.error
      }
    });
  }

  saveTokenInLocalStorage(token:string){
    localStorage.setItem("token",token)
  }

}
