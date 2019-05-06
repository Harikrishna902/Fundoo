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
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { EditnotesComponent } from '../editnotes/editnotes.component';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import {EditlabelService } from '../../services/editlabels/editlabel.service';
import { Note } from '../models/reminder';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  flag = true;
  email: string;
  response: any;
  note :Note[];
  dateTime: any;
  description: "";
  tokenOne: "";
  date: any;

  /**
	 * var to hold present time
	 */
  currentdate: any;
  currentDateAndTime: any;
  //color:any;
  timer: any;
  /**
	 * variable to check the error
	 */
  public iserror = false;
  /**
	 * to show error message
	 */
	public errorMessage = "";

  fulldate: any
  /**
	 * variable which holds the color of note
	 */
  public color = "";
  colour = "";
  rowcard
  wrap: string = "wrap";
  direction: string = "row";
  layout: string = this.direction + " " + this.
  
wrap;

  //createNotes:string;
  noteform: FormGroup;
  constructor(private formBuilder: FormBuilder, private notes: NoteService, private label:EditlabelService,
    private route: Router, private viewChange: ViewserviceService, private dialog: MatDialog) {

    this.viewChange.getView().subscribe((res => {
      this.view = res;
      this.direction = this.view.data;

      console.log("Direction is :", this.direction);

      this.layout = this.direction + " " + this.wrap;
      console.log("Layout is ", this.layout);

    }))
}

  token
  uid
  tokendecode
  labels
  ngOnInit() {

    this.noteform = this.formBuilder.group({
      title: '',
      description: '',

    });


    this.token = localStorage.getItem('token');
    this.tokendecode = decode(this.token);
    this.uid = this.tokendecode.id;

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

    let labelobj= this.label.getLabel(this.uid);
    labelobj.subscribe((res:any)=>{
      debugger
      
      this.labels= res;
      console.log("asdasd",this.labels);
    })

    // setInterval(() => {
    //   this.getNotes();
    // }, 1000);
    
   }
  view;
  /**
   * function to get notes
   * return obseravble 
   */
   getNotes() {
    //debugger
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    const emailid = tokenPayload.email;
   // debugger
    let noteobj = this.notes.displayNotes(this.uid);
    noteobj.subscribe((data: any) => {
      debugger   
      this.note = data;


    });
  }

 /**
  * function for cancel icon 
  */
  closeDate()
  {
    //debugger
    this.timer = false;
    this.currentDateAndTime = undefined;
    
  }
  
    
  
  




  flip() {
    // debugger;
    //this.timer = false;
    this.flag = !this.flag;
  }



  setColorToTitle(changecolor) {
    debugger;
    this.color = changecolor;
    debugger

  }


  /**
   * function to create notes
   * @param value 
   * @return obseravable data
   */
  image:string;
  notescreate(value: any,labelid:any) {
    // debugger;
    this.flag = true;
    let obj = this.notes.createNotes(value, this.uid, this.currentDateAndTime,this.colour,this.image,labelid);

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

  setColor(n, colour) {
    debugger;
   this.note.forEach(element => {
      if (element.id == n.id) {
        element.color = colour;
      }
    });
    let col = this.notes.changeColor(n.id, colour);

    col.subscribe((res: any) => {
      console.log(res);
      if (res.message == "200") {
        this.getNotes();
      }
      else {

      }
    })
  }

  /**
   * editNotes
   */
  openNotes(n) {
    debugger
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.height = "auto";
    /**
     *  panel class:adds a list of custom CSS classes to the Dialog panel
     */
    dialogConfig.panelClass = 'custom-dialog-container'

    dialogConfig.data = {

      notesdata: n
    };
    this.dialog.open(EditnotesComponent, dialogConfig)
  }


  notesarchive(id) {
    debugger
    let arch = this.notes.archiveNote(id);
    arch.subscribe((res: any) => {

      if (res.message == "200") {
        this.getNotes();
      }
      else {

      }
    })


  }


  /**
  * function to deletenotes
  * return obseravble 
  */
 deleteNote(n, value) {
  debugger;                                                                                
  console.log(n.id);
  let obj = this.notes.notedtrash(n);
  obj.subscribe((res: any) => {
    debugger;
    console.log(res.message);

    if (res.status == "200") {


      this.note.forEach(element => {
        debugger
          if(element.id==n){
            element.trash = value;
            this.getNotes();
          }

      });

    }
  });
 }



/**
	 * @var difference intger having the difference
	 * @var dirrection string having the direction of drag
	 */
	difference;
	dirrection;
	/**
	 * @method drop
	 * @description function to drag and drop the card
	 * @param CdkDragDrop array
	 */
	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.note, event.previousIndex, event.currentIndex);
		if (event.previousIndex - event.currentIndex >= 0) {
			this.difference = event.previousIndex - event.currentIndex;
			// alert("pas");
			this.dirrection = "positive";
		} else {
			this.difference = (event.previousIndex - event.currentIndex) * -1;
			// alert("neg");
			this.dirrection = "negative";
		}
		// console.log(event.currentIndex);

		// console.log(this.notes[event.currentIndex]);

		let obbs = this.notes.dragAndDrop(
			this.difference,
			this.notes[event.currentIndex].dragId,
			this.dirrection,
			this.email
		);
		obbs.subscribe(
			(res: any) => {
				//   obbs.unsubscribe();
			},
			error => {
				this.iserror = true;
				this.errorMessage = error.message;
			}
		);
	}





  /**
	 * var to hold image base64url
	 */
  public base64textString;
  Mainimage
  imageNoteId

  dsf(sdf,dsf){
debugger
  }
  onSelectImage(event, noteId) {
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
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    const email= tokenPayload.email;
    debugger
    var binaryString = readerEvt.target.result;
    console.log(binaryString,"gfhgh");  
    this.base64textString = btoa(binaryString);
    this.note.forEach(element => {
      if (element.id == this.imageNoteId) {
        element.image = "data:image/jpeg;base64," + this.base64textString;
      }
    });

    if (this.imageNoteId == "01") {
      this.Mainimage = "data:image/jpeg;base64," + this.base64textString;
    } else {
      this.Mainimage = "data:image/jpeg;base64," + this.base64textString;
      let obss = this.notes.imagesaver(
      	this.Mainimage,
      	this.uid,
        this.imageNoteId
      );
      obss.subscribe((res: any) => {});
    }
  }


addlabel(labelid)
{
 
  }

  


}