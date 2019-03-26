/************************************************************************************************
* Execution : 1. default node cmd> notes.ts 
* 
* Purpose : dashboard 
* 
* @file : notes.ts
* @module : notes.ts - This is optional if expeclictly its an npm or local package
* @author : harikrishna <nalluri.harikrishna1@gmail.com>
* @since : 18-3-2019
*
*************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NoteService } from '../../services/noteservice/note.service';
import decode from 'jwt-decode';
import { Router } from '@angular/router';
import * as moment from "moment";
import { ViewserviceService } from '../../services/viewservice/viewservice.service';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  flag = true;
  email: string;
  response: any;
  note;

  description: "";
  tokenOne: "";
  date:any;
  currentdate:any;
  currentDateAndTime:any;
  timer:any;

  fulldate:any


  rowcard
  wrap: string = "wrap";
	direction: string = "row";
	layout: string = this.direction + " " + this.wrap;

  //createNotes:string;
  noteform: FormGroup;
  constructor(private formBuilder: FormBuilder, private notes: NoteService, private route: Router,private viewChange: ViewserviceService) {
    
    this.viewChange.getView().subscribe((res=>{
      this.view =res;
      this.direction = this.view.data;
      
      console.log("Direction is :", this.direction);

			this.layout = this.direction + " " + this.wrap;
      console.log("Layout is ", this.layout);
     
    }))
   

   }

  ngOnInit() {

    this.noteform = this.formBuilder.group({
      title: '',
      description: '',

    });

    this.getNotes();

    this.viewChange.getView().subscribe((res=>{
      this.view = res;
      this.direction = this.view.data;
      
      this.rowcard = this.view.class;
      this.layout = this.direction + " "+this.wrap;
  }))

  }
  view;
  /**
   * function to get notes
   * return obseravble 
   */
  getNotes() {
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    const emailid = tokenPayload.email;
    debugger
    let noteobj = this.notes.displayNotes(emailid);
    noteobj.subscribe((data: any) => {
      debugger
      this.note = data as string[];
    });
  }



  flip() {
    debugger;
    this.timer =false;
    this.flag = !this.flag;
   }


/**
 * function to create notes
 * @param value 
 * @return obseravable data
 */
  notescreate(value: any) {
    debugger
    const email = localStorage.getItem('email');
    let obj = this.notes.createNotes(value, email,this.currentDateAndTime);

    obj.subscribe((res: any) => {
      debugger
      console.log(res.status);
      if (res.status == "200") {
        this.tokenOne = res.token;
      }
    });
  }
  



today(){
  var date = new Date();
  this.date = date.toDateString();
  this.currentdate = moment(this.date).format('DD/MM/YY');
  this.currentDateAndTime = this.currentdate+" "+"8:00";
  this.timer=true;
}

tomorrow(){
  var date = new Date();
  date.setDate(date.getDate() + 1);
  this.date = date.toDateString();
  this.currentdate = moment(this.date).format('DD/MM/YY');
  this.currentDateAndTime = this.currentdate+" "+"8:00";
  this.timer=true;
}
nextWeek(){
  var date = new Date();
  //date.setDate(date.getDate() + 1);
  this.fulldate = date.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7));
  //this.date = date.toDateString();
  this.currentdate = moment(this.date).format('DD/MM/YY');
  this.currentDateAndTime = this.currentdate+" "+"8:00";
  this.timer=true;

}
}



