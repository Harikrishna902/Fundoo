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
import { FormsModule, FormBuilder,FormGroup,Validators, FormControl } from '@angular/forms';

//import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model:any;
  response: any;
  message='';

  LoginForm:FormGroup;
  // FirstName = new FormControl('', [Validators.required]);
  // Lastname = new FormControl('', [Validators.required]);
  // username = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('', [Validators.required]);
  // confirm = new FormControl('', [Validators.required]);
  // service = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.LoginForm=this.formBuilder.group({
      //FirstName: ['', Validators.required],
     // Lastname: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
     // confirm: ['', Validators.required]
});
  }
}
