import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { serviceUrl } from "../../serviceUrl/serviceurl.service";
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient,private serviceUrl:serviceUrl,private route: ActivatedRoute){ }

createNotes(note,email){
  let createnotes = new FormData();
  createnotes.append("email",email);
  createnotes.append("title",note.title);
  createnotes.append("description",note.description);
  return this.http.post(this.serviceUrl.host+this.serviceUrl.createnotes,createnotes);

}


displayNotes(data){
let emaildata = new FormData();
 emaildata.append("email",data);
  
return this.http.post(this.serviceUrl.host+this.serviceUrl.displaynotes,emaildata);
}
}
