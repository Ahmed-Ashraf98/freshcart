import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToasterManagerComponent } from '../../shared/ui/toaster-manager/toaster-manager.component';
import { BtnLoaderComponent } from "../../shared/ui/btn-loader/btn-loader.component";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, AlertErrorComponent, BtnLoaderComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{



  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _AuthService = inject(AuthService);
  toasterManger = new ToasterManagerComponent();
  isBtnLoad : boolean = false;
  displayTime:any;
  isReSendCodeClicked: boolean = false;
  stepCounter : number = 1;

  forgotForm :FormGroup = this._FormBuilder.group({
    email : ['',[Validators.email, Validators.required]]
  })

  resetCodeForm :FormGroup = this._FormBuilder.group({
    cel1 : ['',[Validators.required]],
    cel2 : ['',[Validators.required]],
    cel3 : ['',[Validators.required]],
    cel4 : ['',[Validators.required]],
    cel5 : ['',[Validators.required]],
    cel6 : ['',[Validators.required]],
  })

  newPwdForm :FormGroup = this._FormBuilder.group({
    email : ['',[Validators.email, Validators.required]],
    newPassword : ['',[Validators.required,Validators.pattern(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$`)]]
  })


  saveEmail(email:string){
    localStorage.setItem("email",email);
  }

  getEmail():string{
    return localStorage.getItem("email")!;
  }
  
  setStepInStorage(stepNum:number){
    localStorage.setItem("step",stepNum.toString());
  }

  getCurrentStep():number{
    return Number(localStorage.getItem("step")!) || this.stepCounter;
  }


  resetChangePwdData():void{
    localStorage.removeItem("step");
    localStorage.removeItem("email");
  }

  ngOnInit(): void {
    this.stepCounter = this.getCurrentStep();
    this.newPwdForm.get("email")?.setValue(this.getEmail());
  }



  sendResetCode(email?:string|null){

    let emailToSend:any;

    if(email){
      emailToSend = email;
    }else{
      emailToSend = this.forgotForm.get("email")?.value;
    }

    this._AuthService.forgotPassword({email:emailToSend}).subscribe({
      next:(res)=>{
        
        this.toasterManger.showSuccess("The OTP Sent successfully to your email");
        this.stepCounter = 2;
        this.setStepInStorage(this.stepCounter);
        this.saveEmail(emailToSend)
        this.newPwdForm.get("email")?.setValue(emailToSend)
        this.isBtnLoad = false;
      },error:(err)=> {
        console.log(err.error.message)
        this.toasterManger.showError("Error: "+err.error.message)
        this.isBtnLoad = false;
      }
    })
  }


  verifyCode(){
    let resetCode : String = "";

    for (const cel in this.resetCodeForm.value) {
        resetCode += this.resetCodeForm.value[cel];
    }

    this._AuthService.verifyResetCode({resetCode}).subscribe({
      next:(res)=>{
        this.toasterManger.showSuccess("The Code verifed successfully");
        this.stepCounter = 3;
        this.setStepInStorage(3);
        this.isBtnLoad = false;
      },error:(err)=> {
        this.toasterManger.showError("Error: "+err.error.message)
        this.isBtnLoad = false;
      }
    })
  }


  updatePwd(){
    this._AuthService.updateLoggedUserPassword(this.newPwdForm.value).subscribe({
      next:(res)=>{
        
        this.toasterManger.showSuccess("Your password updated successfully");
        this.resetChangePwdData();
        this._router.navigate(["sigin"]);
        this.isBtnLoad = false;
      },
      error:(err)=> {
        this.toasterManger.showError("Error: "+err.error.message)
        this.isBtnLoad = false;
      }
    })
  }


  reSendOTP(){

    this.isReSendCodeClicked = true;
    this.sendResetCode(this.getEmail());
    this.timer(1);
  }

  timer(minute:any) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.displayTime = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
        this.isReSendCodeClicked = false;
      }
    }, 1000);
  }


  submitData(){

    this.isBtnLoad = true;

    if(this.stepCounter == 1){

     this.sendResetCode();
      
    }else if( this.stepCounter == 2){

      this.verifyCode();

    }else if( this.stepCounter == 3){
      
      this.updatePwd();
    
    }
  }

  goBack(){
    if(this.stepCounter == 2){
      this.stepCounter = 1;
      this.setStepInStorage(1);
      this.saveEmail("");
      this.newPwdForm.get("email")?.setValue("");
    }else if(this.stepCounter == 3){
      this.stepCounter = 2;
      this.setStepInStorage(2);
      for (let i = 0; i < 6; i++) {
        // cel1
        this.resetCodeForm.get(`cel${i+1}`)?.setValue("");
      }
    }
  }
  
  cancelProcess(){
    this.resetChangePwdData();
    this._router.navigate(["sigin"]);
  }

}
