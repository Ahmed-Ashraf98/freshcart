import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertErrorComponent } from "../../shared/ui/alert-error/alert-error.component";
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent,NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{

  private readonly _auth = inject(AuthService);
  private readonly _router = inject(Router);


  showErrorPopUp:boolean = false
  errMsg :string = '';

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
    this._auth.signUp(this.registerForm.value).subscribe({
      next:(res)=> {
        console.log(res)
        this._router.navigate(['./signin'])
      },
      error:(error)=> {
        this.showErrorPopUp = true;
        this.errMsg = error.error.message
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