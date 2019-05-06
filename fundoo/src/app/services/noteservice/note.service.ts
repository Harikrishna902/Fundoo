import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from "@angular/common/http";
import { serviceUrl } from "../../serviceUrl/serviceurl.service";
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  // forEach(arg0: (element: any) => void) {
  //   throw new Error("Method not implemented.");
  // }

  constructor(private http: HttpClient, private serviceUrl: serviceUrl, private route: ActivatedRoute) { }

  /**
   * function to create note
   * @method createNotes
   * @param note 
   * @param email 
   * @param time
   * @returns obseravble data 
   */
  createNotes(note, id,time,colour,image,labelid) {
    debugger;
    let createnotes = new FormData();
    createnotes.append("uid", id);
    createnotes.append("title", note.title);
    createnotes.append("description", note.description);
    createnotes.append("reminder",time);
     createnotes.append("label_id",note.label);
    createnotes.append("color",colour);
    createnotes.append("image",image);
    createnotes.append("labelid",labelid);
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
    debugger;
    let emaildata = new FormData();
    emaildata.append("uid", data);
   // emaildata.append("id",id);
    return this.http.post(this.serviceUrl.host + this.serviceUrl.fetchnotes, emaildata);
  }

  /**
   * function to delete note
   * @param data
   * @method deleteNotes
   * @returns obseravble data
   */
  deleteNotes(id){
    debugger;
    let idd=new FormData();
    idd.append("id",id);
    return this.http.post(this.serviceUrl.host + this.serviceUrl.deleteNotes,idd);
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


  
  /** 
   * function to update notes
   *@param title 
   *@param description 
   *@param id 
   *@retuns obseravble data
   */
  updateNotes(data,id){
    debugger
    let update = new FormData();
    update.append("title",data.title);
    update.append("description",data.description);
    update.append("reminder",data.reminder);
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



  notedtrash(id){
    let del = new FormData();
    del.append("id",id);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.notetrash,del);
  }

  /**
   * @method trash to store in trash
   * @param id 
   * @returns observable data
   */
  trashnote(id){
    let trash = new FormData();
    trash.append("id",id);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.fetchtrash,trash);
  }

/**
 * @method to delete note forever
 * @param id 
 * @returns obseravble data
 */
  notedelete(id){
    let del = new FormData();
    del.append("id",id);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.notedelete,del);
  }

/**
 * @method to restore the note
 * @param id 
 * @returns observable data
 */
  restoreNote(id){
    let restore =new FormData();
    restore.append("id",id);
    return this.http.post(this.serviceUrl.host+this.serviceUrl.restorenote,restore);
  }

  /**
   * @method to save image
   * @param base64 
   * @param email 
   * @param noteid 
   * @returns obseravble data
   */
  imagesaver(base64,uid,noteid){
    debugger
    let image = new FormData();
    image.append("base64",base64);
    image.append("uid",uid);
    image.append("noteid",noteid);

    return this.http.post(this.serviceUrl.host+this.serviceUrl.noteimage,image);

  }
  /**
	 * @method dragAndDrop()
	 * @return observable data
	 * @param prevId
	 * @param currId
	 * @description Function to drag and drop the card
	 */
	dragAndDrop(diff, currId, direction, email) {
		let headers_object = new HttpHeaders().set(
			"Authorization",
			localStorage.getItem("token")
		);
		let dragAndDropData = new FormData();
		dragAndDropData.append("diff", diff);
		dragAndDropData.append("currId", currId);
		dragAndDropData.append("direction", direction);
		dragAndDropData.append("email", email);
		return this.http.post(
			this.serviceUrl.host + this.serviceUrl.dragAndDropData,
			dragAndDropData,
			{ headers: headers_object }
		);
	}

}

