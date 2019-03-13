/************************************************************************************************
* Execution : 1. default node cmd> register.ts 
* 
* Purpose :Register to fundoo
* 
* @file :register.ts
* @module :register.ts - This is optional if expeclictly its an npm or local package
* @author : harikrishna <nalluri.harikrishna1@gmail.com>
* @since : 3-3-2019
*
*************************************************************************************************/

import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//import { HttpService } from '../../service/register.service';
//import { Router } from '@angular/router';
import { RegisterService } from '../../services/registerservice/register.service';
import { PasswordValidation } from '../../passwordMatches';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  /*
   message = '';
   selected: '';
   hide = true;
   model: any;
   responce: any;
   messageOne='';
    
   errormessage=String
   FirstName = new FormControl('', [Validators.required]);
   Lastname = new FormControl('', [Validators.required]);
   username = new FormControl('', [Validators.required, Validators.email]);
   password = new FormControl('', [Validators.required]);
   confirm = new FormControl('', [Validators.required]);
   service = new FormControl('', [Validators.required]);*/

  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private S_register: RegisterService) { }
  model: any;
  errormsg: string = "";
  /**
   * validations for register page
   */
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      Lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', Validators.required]
    },
      {
        Validators: PasswordValidation.MatchPassword

      });
  }
  register() {
    if(this.registerForm.invalid){
      return;
    }
    debugger;
    let obj = this.S_register.CreateUser(this.registerForm.value);
    /**
     * error handling and returns observable
     * sends response  
     */
    debugger;
    obj.subscribe((res: any) => {
      console.log(res.message);
      if (res.message == "200") {
        this.errormsg = "registration is succesfull \n ";
      } else if (res.message == "304") {
        this.errormsg = "user not registred ,enter valid data";
      } else if (res.message == "201") {
        this.errormsg = "email id is already exist";

      } else {
        this.errormsg = "error 204 no content";
      }
    });
  }
}
  // register() {
  // debugger;
  //   try {
  //     this.model = {
  //       "firstName":this.FirstName .value,
  //       "lastName": this.Lastname .value,
  //       //"phoneNumber": '',
  //       //"imageUrl": '',
  //       //"service": this.service.value,
  //       "username": this.username.value,
  //       "confirm": this.confirm.value,
  //       //"cardId": '',
  //       "password": this.password.value,
  //     }

  //     if (this.FirstName.value == '' || this.Lastname.value == '' || this.username.value == '' || this.password.value == '' || this.confirm.value == ''){
  //       this.message = "Fields are missing";
  //       // console.log("Fields are missing");
  //       return;
  //     }
  //     else {
  //       (this.password.value != this.confirm.value)
  //    {
  //     this.message ="password and confirm password should be same ";
  //     }

  // this.httpService.postRequest('/codeiginter/SignUp', this.model).subscribe(data => {

  //   this.responce=data;
  //    this.messageOne=this.responce.message;
  //   console.log(data);
  //   // this.router.navigate(['login']);

    // 
    // else {
    //   this.message = "registered successfully";
    //   }
    //   alert('Something is about to display');
    //   console.log(this.model);

  //     }
  //   }
  //   catch (err) {
  //     this.message="Something bad happened"
  //   }

  // }




