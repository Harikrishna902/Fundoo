/************************************************************************************************
* Execution : 1. default node cmd> login.ts 
* 
* Purpose : Login to fundoo
* 
* @file : login.ts
* @module : login.ts - This is optional if expeclictly its an npm or local package
* @author : harikrishna <nalluri.harikrishna1@gmail.com>
* @since : 1-3-2019
*
*************************************************************************************************/

import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginserviceService } from '../../services/loginservice/loginservice.service';
//import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any;
  response: any;
 errormsg = '';

  LoginForm: FormGroup;
  // FirstName = new FormControl('', [Validators.required]);
  // Lastname = new FormControl('', [Validators.required]);
  // username = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('', [Validators.required]);
  // confirm = new FormControl('', [Validators.required]);
  // service = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder, private S_login: LoginserviceService ) { }

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      /**
       * validations for email and password 
       */
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }
  login() {
    if(this.LoginForm.invalid){
      return;
    }
    debugger;
    let obj = this.S_login.UserLoginData(this.LoginForm.value);
    /**
     * error handling and 
     * sends response  
     */
    debugger;
    obj.subscribe((res: any) => {
      console.log(res.message);
      if (res.message == "200") {
        this.errormsg = "login is succesfull \n ";
      } else if (res.message == "304") {
        this.errormsg = "not registred user,enter valid data";
      } else if (res.message == "201") {
        this.errormsg = "invalid user";

      } else {
        this.errormsg = "error 204 no content";
      }
    });
  }
}
