import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { serviceUrl } from "../../serviceUrl/serviceurl.service";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  EditlabelService{

  constructor(private http: HttpClient,private serviceUrl:serviceUrl) { }
  labelsubject = new Subject();

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

  deletelabel(id){
    let label = new FormData();
    label.append("id",id);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.deletelabel,label);
  }



  labelnameSet(labelname){
   this.labelsubject.next(labelname);
}
}
