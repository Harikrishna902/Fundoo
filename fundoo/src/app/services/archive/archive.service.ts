import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { serviceUrl } from "../../serviceUrl/serviceurl.service";

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private http: HttpClient,private serviceUrl:serviceUrl) { }


  getArchive(uid){
    let fetarc = new FormData();
    fetarc.append("uid",uid);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.getArch,fetarc);
  }

  unarchived(id,flag){ 
    let unarch = new FormData();
    unarch.append("uid",id);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.unarchived,unarch);
  }
}
