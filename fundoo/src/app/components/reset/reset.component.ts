/************************************************************************************************
* Execution : 1. default node cmd>reset.ts 
* 
* Purpose : resetpassword to fundoo
* 
* @file : reset.component.ts
* @module : reset.ts - This is optional if expeclictly its an npm or local package
* @author : harikrishna <nalluri.harikrishna1@gmail.com>
* @since : 10-3-2019
*
*************************************************************************************************/

import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginserviceService } from '../../services/loginservice/loginservice.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})

export class ResetComponent implements OnInit
{
  model: any;
  response: any;
  errormsg = '';
  value;
  session;

  ResetForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private S_login: LoginserviceService ) { }

  ngOnInit() {
    this.ResetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    
    
    });
    
    /**
     * function to get response of session
     */
    let obs = this.S_login.getEmail(this.ResetForm.value);
    obs.subscribe((res:any)=>{
      this.value = res.key;
      this.session = res.session;
    });
}

/**
 * function to click method and 
 * get response
 */
reset() {
  if(this.ResetForm.invalid){
    return;
  }
  debugger;
  let obj = this.S_login.userResetPass(this.ResetForm.value);

  /**
   * error handling and 
   * sends response  and obseravble
   */
  debugger;
  obj.subscribe((res: any) => {
    console.log(res.message);
    if (res.message == "200") {
      this.errormsg = "reset sucessful \n ";
    } else {
      this.errormsg = "password should be above 6 letters";
    } 
  });

}


}