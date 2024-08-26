import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast-error',
  standalone: true,
  imports: [NgClass],
  templateUrl: './toast-error.component.html',
  styleUrl: './toast-error.component.scss'
})
export class ToastErrorComponent {

  @Input() errorObj?:any;
  @Input() showErrorPopUp?:boolean;

  hideToast(){
    this.showErrorPopUp = false;
  }
  
}
