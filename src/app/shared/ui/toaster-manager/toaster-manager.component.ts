import { Component, inject } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toaster-manager',
  standalone: true,
  imports: [],
  templateUrl: './toaster-manager.component.html',
  styleUrl: './toaster-manager.component.scss'
})
export class ToasterManagerComponent {

  private readonly _toastr = inject(ToastrService);

  globalOptions:Partial<IndividualConfig<any>> = {
    progressAnimation:'decreasing',
    newestOnTop:true,
    progressBar:true,
    closeButton:true
  }

  showSuccess(msg:string,title:string|null = null) {

    if(title){
      this._toastr.success(msg,title,this.globalOptions);
    }else{
      this._toastr.success(msg,"",this.globalOptions);
    }
  }

  showError(msg:string,title:string|null = null) {
    if(title){
      this._toastr.error(msg,title,this.globalOptions);
    }else{
      this._toastr.error(msg,"",this.globalOptions);
    }
  }

  showInfo(msg:string,title:string|null= null) {
    if(title){
      this._toastr.info(msg,title,this.globalOptions);
    }else{
      this._toastr.info(msg,"",this.globalOptions);
    }
  }

}
