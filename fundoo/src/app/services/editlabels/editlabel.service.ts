import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { serviceUrl } from "../../serviceUrl/serviceurl.service";


@Injectable({
  providedIn: 'root'
})
export class  EditlabelService{

  constructor(private http: HttpClient,private serviceUrl:serviceUrl) { }

  getLabel(email){
    let label = new FormData();
    label.append("email",email);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.getlabel,label);
  }


  setLabel(email,labelname){
    let label = new FormData();
    label.append("email",email);
    label.append("label",labelname.labelname);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.setlabel,label);
  }
}
