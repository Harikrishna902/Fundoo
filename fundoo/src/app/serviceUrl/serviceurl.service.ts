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
	public forgot="forgot";
	public reset="reset";
	//public reset = "resetpass";
  public fetchmail = "fetchemail";
}


