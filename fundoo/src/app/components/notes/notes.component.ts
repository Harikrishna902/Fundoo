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
  date: any;
  /**
	 * var to hold present time
	 */
  currentdate: any;
  currentDateAndTime: any;

  timer: any;
  
  fulldate: any
  /**
	 * variable which holds the color of note
	 */
  public color = "";

  rowcard
  wrap: string = "wrap";
  direction: string = "row";
  layout: string = this.direction + " " + this.wrap;

  //createNotes:string;
  noteform: FormGroup;
  constructor(private formBuilder: FormBuilder, private notes: NoteService, private route: Router, private viewChange: ViewserviceService) {

    this.viewChange.getView().subscribe((res => {
      this.view = res;
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

    /**
     * function to display the notes in grid and list
     *                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
     */
    this.getNotes();
    this.viewChange.getView().subscribe((res => {
      this.view = res;
      this.direction = this.view.data;

      this.rowcard = this.view.class;
      this.layout = this.direction + " " + this.wrap;
    }))

    setInterval(() => {
      this.getNotes();
    }, 1000);

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

   /**
   * function to deletenotes
   * return obseravble 
   */
  deleteNote(n)
  {
    
    console.log(n.id);
    let obj = this.notes.deleteNotes(n.id);

      obj.subscribe((res: any) => 
      {
       debugger;
        console.log(res.message);

        if (res.message == "200") 
        {
          this.getNotes();
        } 
        else 
        {
          
        }
      });
  }



  flip() {
    debugger;
    this.timer = false;
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
    let obj = this.notes.createNotes(value, email, this.currentDateAndTime);

    obj.subscribe((res: any) => {
      debugger
      console.log(res.status);
      if (res.status == "200") {
        this.tokenOne = res.token;
      }
    });
  }




  today() {
    var date = new Date();
    this.date = date.toDateString();
    this.currentdate = moment(this.date).format('DD/MM/YY');
    this.currentDateAndTime = this.currentdate + " " + "8:00";
    this.timer = true;
  }

  tomorrow() {
    var date = new Date();
    date.setDate(date.getDate() + 1);
    this.date = date.toDateString();
    this.currentdate = moment(this.date).format('DD/MM/YY');
    this.currentDateAndTime = this.currentdate + " " + "8:00";
    this.timer = true;
  }
  
	nextWeek() {
		debugger;
		var day = new Date();

		this.fulldate = day.setDate(day.getDate() + ((1 + 7 - day.getDay()) % 7));
		let currentDate = moment(this.fulldate).format("DD/MM/YYYY");
		this.currentDateAndTime = currentDate + " " + " 08:00 PM";
    this.timer = true;
  }

  /**
	 * @method setColorToTitle()
	 * @return void
	 * @param changecolor
	 * @description Function to set colour to title card
	 */
  setColorToTitle(changecolor) {
    debugger;
		this.color = changecolor;
  }

}




