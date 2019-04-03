import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from "@angular/common/http";
import { serviceUrl } from "../../serviceUrl/serviceurl.service";
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient, private serviceUrl: serviceUrl, private route: ActivatedRoute) { }

  /**
   * function to create note
   * @method createNotes
   * @param note 
   * @param email 
   * @param time
   * @returns obseravble data 
   */
  createNotes(note, email,time,) {
    let createnotes = new FormData();
    createnotes.append("email", email);
    createnotes.append("title", note.title);
    createnotes.append("description", note.description);
    createnotes.append("reminder",time);
    //createnotes.append("color",color);
  //   return this.http.post(this.serviceUrl.host + this.serviceUrl.createnotes, createnotes);

  // }


  let headers_object = new HttpHeaders().set("Authorization",
			
  localStorage.getItem("token")
);

 
  console.log(headers_object);
  return this.http.post(this.serviceUrl.host+this.serviceUrl.createnotes,createnotes,{headers:headers_object});

 }
  
/**
 * function to dispaly notes
 * @method displayNotes
 * @param data 
 * @returns obseravble data
 */
  displayNotes(data) {
    let emaildata = new FormData();
    emaildata.append("email", data);

    return this.http.post(this.serviceUrl.host + this.serviceUrl.displaynotes, emaildata);
  }

  /**
   * function to delete note
   * @param data
   * @method deleteNotes
   * @returns obseravble data
   */
  deleteNotes(data){
    debugger;
    let id=new FormData();
    id.append("id",data);
    return this.http.post(this.serviceUrl.host + this.serviceUrl.deleteNotes,id);
  }


  /**
   * function to changecolour
   * @param id 
   * @param colour 
   * @returns obseravble data
   */
  changeColor(id,colour)
  {
    debugger;
    let color = new FormData();
    color.append('id',id);
    color.append('colour',colour)
    return this.http.post(this.serviceUrl.host+this.serviceUrl.changeColor,color);
  }


  
  /*
   * function to update notes
   * @param title 
   * @param description 
   * @param id 
   * @retuns obseravble data
   */
  // updateNotes(title,description,id){
  //   debugger;
  //   let update =new FormData();
  //   update.append('title',title);
  //   update.append('description',description);
  //   update.append('id',id);
  //   return this.http.post(this.serviceUrl.host+this.serviceUrl.updateNotes,update);
  

  updateNotes(data,id){
    debugger
    let update = new FormData();
    update.append("title",data.title);
    update.append("description",data.description);
    update.append("id",id);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.updateNotes,update);
  }

  archiveNote(id)
  {
    debugger;
    let arch = new FormData();
    arch.append("id",id);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.archive,arch);
  }
}

