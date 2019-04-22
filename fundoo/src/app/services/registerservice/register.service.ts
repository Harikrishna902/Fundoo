import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { serviceUrl } from "../../serviceUrl/serviceurl.service";
import {Register} from '../../components/models/note';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
constructor(private http: HttpClient,private serviceUrl:serviceUrl) {}
 
/**
 * @method CreateUser()
 * @return observable data
 * @param register
 * @description Function to send register data to server
 */

  CreateUser(register:Register){
    let createuser = new FormData();
    debugger;
    createuser.append("FirstName",register.FirstName);
    createuser.append("Lastname",register.Lastname);
    createuser.append("email",register.email);
    createuser.append("password",register.password);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.register,createuser);
  }

/**
 * @method addProfilePic
 * @param image 
 * @param email 
 */
  addProfilePic(image,email)
  {
    let addUserImage = new FormData();
    addUserImage.append("image",image);
    addUserImage.append("email",email);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.addUImage,addUserImage);
  }

  /**
   * @method getImage
   * @param email 
   */
  getImage(email)
  {
    debugger;
    let getImg = new FormData();
    getImg.append('email',email);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.getImage,getImg);
  }
}

  





