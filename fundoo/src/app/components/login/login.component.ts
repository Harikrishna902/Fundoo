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
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { tokenKey } from '@angular/core/src/view';
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

  tokens;
  LoginForm: FormGroup;
  // FirstName = new FormControl('', [Validators.required]);
  // Lastname = new FormControl('', [Validators.required]);
  // username = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('', [Validators.required]);
  // confirm = new FormControl('', [Validators.required]);
  // service = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder, private S_login: LoginserviceService, private route: Router) { }
  
  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      /**
       * validations for email and password 
       */
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }
  
  login(value) {
    if (this.LoginForm.invalid) {
      return;
    }
    debugger;
    let obj = this.S_login.UserLoginData(this.LoginForm.value);
    /**
     * error handling and returns observable
     * sends response  
     */
    
    debugger;
    obj.subscribe((res: any) => {
      debugger
      console.log(res.message);
      if (res.message == "200") {

        this.tokens = res.token;
        let headers: HttpHeaders = new HttpHeaders();
        headers.set("Authorization", value.email);
        localStorage.setItem('token', this.tokens);

        localStorage.setItem('email', value.email);
        this.tokens = res.token;
        this.errormsg = "login is succesfull \n ";
        this.route.navigate(["/dashboard"]);
      } else if (res.message == "204") {
        this.errormsg = "login unsuccesfull";
      }
    });

  }
}






