import { Injectable } from '@angular/core';
import { Forgot } from '../../components/models/note';
import { HttpClient } from "@angular/common/http";
import { serviceUrl } from "../../serviceUrl/serviceurl.service";
@Injectable({
  providedIn: 'root'
})
export class ForgotserviceService {

  constructor(private http: HttpClient, private serviceUrl: serviceUrl) { }

  UserForgotData(forgot: Forgot) {
    let userForgotData = new FormData();
    userForgotData.append("email", forgot.email);
    return this.http.post(
      this.serviceUrl.host + this.serviceUrl.forgot, userForgotData
    );

  }
}

