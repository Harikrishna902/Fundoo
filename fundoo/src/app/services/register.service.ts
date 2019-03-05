import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
//import { serviceUrl } from "../serviceUrl/serviceurl.service";
import {Register} from '../components/models/note';

//import {register} from '../components/register/register.component';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  // CreateUser(model: any): any {
  //   throw new Error("Method not implemented.");
  // }
  // RegistrationData: any;
  // UserRegistrationData(model: any): any {
  //   throw new Error("Method not implemented.");
  // }

  constructor(private http: HttpClient ) {}
  baseUrl : string ="http://localhost/codeigniter/register"


  CreateUser(register:Register){
    let createuser = new FormData();
  
    createuser.append("FirstName",register.FirstName);
    createuser.append("Lastname",register.Lastname);
    createuser.append("email",register.email);
    createuser.append("password",register.password);
    
    return this.http.post(this.baseUrl,createuser);
  }

}


/**
   * @method RegistrationData()
   * @return observable data
   * @param register
   * @description Function to send register data to server
   */
  // RegistrationData(register){
  //   let userRegisterData = new FormData();
  //   userRegisterData.append("username",register.name);
  //   userRegisterData.append("email",register.email);
  //   userRegisterData.append("password",register.pass);
  //   return this.http.post(
  //     this.serviceurl.host + this.serviceurl.register,
  //     userRegisterData);
  
  //   }
  