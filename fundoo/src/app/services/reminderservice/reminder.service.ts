import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { serviceUrl } from "../../serviceUrl/serviceurl.service";

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private http: HttpClient,private serviceUrl:serviceUrl) { }
  getreminder(email){
    let reminderobj = new FormData();
    reminderobj.append("email",email);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.getreminder,reminderobj);
  }
}
