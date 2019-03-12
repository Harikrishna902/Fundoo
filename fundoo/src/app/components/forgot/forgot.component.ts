/************************************************************************************************
* Execution : 1. default node cmd> forgot.ts 
* 
* Purpose : forgot to fundoo
* 
* @file : login.ts
* @module : forgot.ts - This is optional if expeclictly its an npm or local package
* @author : harikrishna <nalluri.harikrishna1@gmail.com>
* @since : 1-3-2019
*
*************************************************************************************************/

import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ForgotserviceService } from '../../services/forgotservice/forgotservice.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit
{
  model: any;
  response: any;
  errormsg = '';

  ForgotForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private S_forgot:ForgotserviceService) { }

  ngOnInit() {
    this.ForgotForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });

}


login() {
  if(this.ForgotForm.invalid){
    return;
  }
  debugger;
  let obj = this.S_forgot.UserForgotData(this.ForgotForm.value);
  /**
   * error handling and 
   * sends response  
   */
  debugger;
  obj.subscribe((res: any) => {
    console.log(res.message); 
    if (res.message == "200"){
      this.errormsg = "reset link has been sent to your mail \n ";
    } else {
      this.errormsg = "mail not registered";
    } 
  });

}

}
