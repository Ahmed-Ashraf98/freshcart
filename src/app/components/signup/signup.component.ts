import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertErrorComponent } from "../../shared/ui/alert-error/alert-error.component";
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToasterManagerComponent } from '../../shared/ui/toaster-manager/toaster-manager.component';
import { BtnLoaderComponent } from '../../shared/ui/btn-loader/btn-loader.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent,NgClass,BtnLoaderComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{

  private readonly _auth = inject(AuthService);
  private readonly _router = inject(Router);

  isBtnLoad : boolean = false;
  toasterManger = new ToasterManagerComponent();


  registerForm = new FormGroup({

    name:new FormControl('',[Validators.minLength(3), Validators.maxLength(20),Validators.required]),
    email:new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',[Validators.required,Validators.pattern(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$`)]),
    rePassword: new FormControl('',[Validators.required])
  },this.confirmPassword)


  ngOnInit(): void {
    this.disableRePassword();
  }

  sendData(){
    this.isBtnLoad = true;
    this._auth.signUp(this.registerForm.value).subscribe({
      next:(res)=> {
        console.log(res);
        this.toasterManger.showSuccess("Account Is Created Successfully");
        this._router.navigate(['./signin'])
        this.isBtnLoad = false;
      },
      error:(error)=> {
        this.isBtnLoad = false;
        let errMsg = error.error.message
        this.toasterManger.showError("Unable to create an account, "+ errMsg);
      }
    });
    
  }

  checkPassword(){
    if(this.registerForm.get("password")?.valid){
      this.enableRePassword();
    }else{
      this.disableRePassword();
      this.clearRePassword();
    }
  }

  confirmPassword(control : AbstractControl){
    if(control.get("password")?.value == control.get("rePassword")?.value){
        return null;
    }
    return {mismatch:true};
  }

  disableRePassword(){
    this.registerForm.get("rePassword")?.disable();
  }

  enableRePassword(){
    this.registerForm.get("rePassword")?.enable();
  }
 
  clearRePassword(){
    this.registerForm.get("rePassword")?.setValue('');
  }

}