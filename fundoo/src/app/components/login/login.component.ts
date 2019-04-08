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
import { CookieService } from 'ngx-cookie-service';
//import { tokenKey } from '@angular/core/src/view';
import {
	AuthService,
	FacebookLoginProvider,
	GoogleLoginProvider
} from "angular-6-social-login";
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

  constructor(private formBuilder: FormBuilder, private S_login: LoginserviceService, 
    private socialAuthService: AuthService,private route: Router,private cookieserv:CookieService ) { }
  
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

  /**
	 * @method socialSignIn()
	 * @return void
	 * @param socialPlatform
	 * @description Function to error validation
	 */

	public socialSignIn(socialPlatform: string) {
		debugger;
		let socialPlatformProvider;
		if (socialPlatform == "facebook") {
			socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
		} else if (socialPlatform == "google") {
			socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
		}

		this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
			debugger;
			this.sendToRestApiMethod(
        userData.name	,
				userData.email,
				userData.image,
				userData.token
			);
		});
  }


  /**
	 * @method sendToRestApiMethod()
	 * @return void
	 * @param token
	 * @param email
	 * @param image
	 * @param name
	 * @description Function to error validation
	 */
  message
  sendToRestApiMethod(name,email,image,token){
    debugger;
      let socialres = this.S_login.socialLogin(email,name);
      socialres.subscribe((res:any)=>{
        debugger
        console.log(res);
        if(res.message=="200"){ 
          this.cookieserv.set("email",email);
          this.cookieserv.set("image",image);
          // localStorage.setItem("token",token);
          
          this.route.navigate(["/dashboard"]);
        }
      })
  }
  

}






