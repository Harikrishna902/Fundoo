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
    label.append("uid",email);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.getlabel,label);
  }


  setLabel(uid,labelname){
    debugger
    let label = new FormData();
    label.append("uid",uid);
    label.append("label",labelname.labelname);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.setlabel,label);
  }

  deletelabel(id){
    let label = new FormData();
    label.append("uid",id);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.deletelabel,label);
  }

  fetchLabeledNotes(id, labelname) {

    let userNotesdata = new FormData();
    userNotesdata.append("uid", id);
    userNotesdata.append("labelname",labelname);
    return this.http.post(this.serviceUrl.host + this.serviceUrl.getAllLabeledNotes, userNotesdata);

  }

  updatelabel(id){
    let label = new FormData();
    label.append("uid",id);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.updatelabel,label);
  }



  labelnameSet(labelname){
   this.labelsubject.next(labelname);
}
getlname(){
  return this.labelsubject.asObservable();
}

getLabelNotes(lid){
let labelnote = new FormData();
labelnote.append("lid",lid);
debugger
return this.http.post(this.serviceUrl.host+this.serviceUrl.fetchlabelnote,labelnote);

} 

labelAdd(lid,noteid,uid,flag){
let addlabel = new FormData();
addlabel.append("uid",uid);
addlabel.append("labelid",lid);
addlabel.append("noteid",noteid);
addlabel.append("flag",flag);

return this.http.post(this.serviceUrl.host+this.serviceUrl.addLabel,addlabel);
}

labelnamebyid(id){
let lnameid = new FormData();
lnameid.append("lid",id)
return this.http.post(this.serviceUrl.host+this.serviceUrl.labelnamebyid,lnameid);
}
}
