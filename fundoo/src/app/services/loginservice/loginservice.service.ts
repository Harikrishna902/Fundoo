import { Injectable } from '@angular/core';
import {Login} from '../../components/models/note';
import { HttpClient } from "@angular/common/http";
import { serviceUrl } from "../../serviceUrl/serviceurl.service";
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http: HttpClient,private serviceUrl:serviceUrl,private route: ActivatedRoute) { }
  baseUrl: string = "http://localhost/codeigniter/loginto"; 
/**
 * @method userLoginData
 * @param login 
 * @returns obseravble data
 * @function sends login data 
 */

  UserLoginData(login:Login) {
		let userLoginData = new FormData();
		userLoginData.append("email", login.email);
		userLoginData.append("password", login.password);
		return this.http.post(
			this.serviceUrl.host + this.serviceUrl.login,userLoginData
			
		);
	}
	getEmail(resetemail){
    let getemail= new FormData();
    getemail.append("token",this.route.snapshot.queryParamMap.get("token"));
   return this.http.post(this.serviceUrl.host+this.serviceUrl.fetchmail,getemail);
  }

  userResetPass(reset) {
    let resett = new FormData();
    resett.append("token", this.route.snapshot.queryParamMap.get("token"));
    resett.append("password", reset.password);

    return this.http.post(this.serviceUrl.host+this.serviceUrl.reset, resett);
  }

}
