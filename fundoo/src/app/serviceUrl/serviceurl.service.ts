import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
@Injectable({
	  providedIn: 'root'
	 })
export class serviceUrl {
	construct(){

	}
	public host = environment.baseURL;

	public register = "register";
    public login = "login";
}


