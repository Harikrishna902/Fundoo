import { Injectable } from '@angular/core';
import {Login} from '../../components/models/note';
import { HttpClient } from "@angular/common/http";
import { serviceUrl } from "../../serviceUrl/serviceurl.service";
@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http: HttpClient,private serviceUrl:serviceUrl) { }
   
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
}
