/************************************************************************************************
* Execution : 1. default node cmd> dashboard.ts 
* 
* Purpose : dashboard 
* 
* @file : dashboard.ts
* @module : dashboard.ts - This is optional if expeclictly its an npm or local package
* @author : harikrishna <nalluri.harikrishna1@gmail.com>
* @since : 19-3-2019
*
*************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { ViewserviceService } from '../../services/viewservice/viewservice.service';
import { searchService } from '../../services/searchservice/search.service';
import { MatDialog, MatDialogConfig,MatDialogRef, } from '@angular/material';
import {EditlabelService } from '../../services/editlabels/editlabel.service';
import { EditlabelsComponent } from '../editlabels/editlabels.component';
import{ Label}from '../models/labels';
import { RegisterService } from '../../services/registerservice/register.service';
import { LabelService } from '../../services/labels/label.service';
;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  email: string;
  isClicked = false;
  searchTerm: string;
  constructor(private route: Router, private labelid: LabelService, private viewChange: ViewserviceService,private data: searchService,private dialog:MatDialog,
    private label:EditlabelService, private S_register: RegisterService) { }
  grid: boolean = false;
  list: boolean = true;
  labels : Label[];
  notes : string[];
  FirstName:string;
  image: string;
  
  uid
  ngOnInit() {
    const token = localStorage.getItem('token');
    var tokenpayload = decode(token);
    this.uid = tokenpayload.id;
   // this.email = tokenpayload .id;
    this.FirstName = tokenpayload .FirstName;
    this.image = tokenpayload .image;
  
    let labelobj= this.label.getLabel(this.uid);
    labelobj.subscribe((res:any)=>{
      debugger
      
      this.labels= res;
      console.log("asdasd",this.labels);
    })
    // this.displayLabels();
    // this.displayNotes();
    this.getImage();
  }

  changeView() {

    if (this.list == true) {
      this.grid = true;
      this.list = false;
    }
    else {
      this.list = true;
      this.grid = false;
    }

    this.viewChange.gridview();
  }




  addAccount() {
    this.route.navigate(['register']);
  }

  signout() {
    this.route.navigate(['login']);
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }
  alert = "Note Archieved";
  action = "undo";


  openLabel(){
    debugger
    const config = new MatDialogConfig();
    config.width="400px";
    config.height="auto";
    //config.overflow="hidden";
    config.data ={data:this.uid};
    const label = this.dialog.open(EditlabelsComponent,config);
  }


  closeSearch()
  {
    debugger;
    this.route.navigate(['dashboard/notes']);
    this.searchTerm = '';
  }


  searchData()
  {
   // debugger;
    if(this.searchTerm!=undefined)
    this.data.setSearchWord(this.searchTerm);
  }

/**
 * function for profilepic
 */
  public base64textString;
  Mainimage;
  imageNoteId;
  imagess;
  onSelectImage(event,noteId){
    debugger;
		this.imageNoteId = noteId;
		var files = event.target.files;
		var file = files[0];
		if (files && file) {
			var reader = new FileReader();
			reader.onload = this._handleReaderLoaded.bind(this);
			reader.readAsBinaryString(file);
		}
  }

  _handleReaderLoaded(readerEvt) {
    debugger;
		var binaryString = readerEvt.target.result;
		console.log(binaryString);
		this.base64textString = btoa(binaryString);
	  if (this.imageNoteId == "01") {
      this.Mainimage = "data:image/jpeg;base64," + this.base64textString;
      this.image = this.Mainimage;
      debugger;
      console.log(this.image);
      let obss = this.S_register.addProfilePic(this.image,this.uid);
      
      obss.subscribe((res: any) => {});
      this.notes.forEach(element => {
        this.imagess = element;
        if (this.imagess.id == this.imageNoteId) {
          this.imagess.image = "data:image/jpeg;base64," + this.base64textString;
        }
      });
		} else {
      
	 }
	}

  fname
  lname
  getImage()
  {
    debugger;
    let getimg = this.S_register.getImage(this.uid);
    getimg.subscribe((res: any) => {
      debugger
      console.log(res[0].image);
      this.image = res[0].image;
      this.fname = res[0].FirstName;
      this.lname = res[0].Lastname;
    })
     
  }


 /**
   * set label
   * @param labelname 
   */
  setLabel(labelname)
  {

  debugger;
  this.labelid.setLabelName(labelname);
  }

}