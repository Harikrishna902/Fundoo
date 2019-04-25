import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
@Injectable({
	  providedIn: 'root'
	 })
export class serviceUrl {
	construct(){

	}
	public host = environment.baseURL;

	public register = "register";
	public login = "login";
	public forgot="forgot";
	public reset="reset";
	public fetchmail = "fetchemail";
	public changeDateTime = "changeDateTime";
	public createnotes="createnotes";
	public fetchnotes = "fetchnotes";
	public deleteNotes="deleteNotes";
	
	public changeColor="changeColor";
	public updateNotes="updateNotes";
	public getreminder = "getreminder";
	public setlabel ="setlabel";
	public getlabel = "getlabel";
	public deletelabel="deleteLabel";
	public getArch = "getarchive";
	public unarchived = "unarchive";
	public archive = "archived";
	public sociallogin ="socialLogin";
	public fetchtrash = "getnote";
	public notedelete ="deletenote";
	public restorenote="restoreDeletedNote";
	public notetrash="noteTrash";
	public noteimage="noteimage";
	public addUImage="addUImage";
	public getImage="getImage";
	public updatelabel="updatelabel";
	public fetchlabelnote="fetchlabelnote";
	public addLabel="addLabel";
	public labelnamebyid="labelnamebyid";
}


