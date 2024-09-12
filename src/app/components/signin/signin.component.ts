import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToasterManagerComponent } from '../../shared/ui/toaster-manager/toaster-manager.component';
import { BtnLoaderComponent } from '../../shared/ui/btn-loader/btn-loader.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,RouterLink,RouterLinkActive,BtnLoaderComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  
  private readonly _auth = inject(AuthService);
  private readonly _router = inject(Router);
  toasterManger = new ToasterManagerComponent();
  isBtnLoad : boolean = false;

  loginForm = new FormGroup({

    email:new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),

  },)

  navigation(){

    let token = localStorage.getItem("token");
    if(token){
      this._auth.validateToken(token).subscribe({
        next:(res:any)=>{
         this._router.navigate(["home"]);
        },error:(err)=>{
          localStorage.clear();
          this._router.navigate(["signin"]);
        }
      })
    }else{
      localStorage.clear();
      this._router.navigate(["signin"]);
    }
  }

  loginIntoApp(){
    this.isBtnLoad = true;
    this._auth.login(this.loginForm.value).subscribe({
      next:(res:any)=> {
        this.saveTokenInLocalStorage(res.token)
        this.isBtnLoad = false;
        this.navigation();
      },
      error:(err)=> {
        this.isBtnLoad = false;
        let errMsg = err.error.errors ? err.error.errors.msg : err.error.message;
        this.toasterManger.showError("Unable to login, "+ errMsg);
      }
    });
  }

  saveTokenInLocalStorage(token:string){
    localStorage.setItem("token",token)
  }

}
