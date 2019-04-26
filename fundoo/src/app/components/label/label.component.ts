import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from "moment";
import { Router } from '@angular/router';
import { Note } from '../models/reminder';
import { ViewserviceService } from '../../services/viewservice/viewservice.service';
import { NoteService } from '../../services/noteservice/note.service';
import decode from 'jwt-decode';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { EditnotesComponent } from '../editnotes/editnotes.component';
import {LabelService} from '../../services/labels/label.service';
import {EditlabelService } from '../../services/editlabels/editlabel.service';
@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  flag = true;
  notelist: any;
  email: string;
  response: any;
  note :Note[];
  dateTime: any;
  description: "";
  tokenOne: "";
  date: any;
  /**
	 * variable which holds the color of note
	 */
  public color = "";
  colour = "";

  /**
	 * var to hold present time
	 */
  currentdate: any;
  currentDateAndTime: any;
  //color:any;
  timer: any;

  fulldate: any
  /**
	 * variable which holds the color of note
	 */
  // public color = "";
  // colour = "";
  rowcard
  wrap: string = "wrap";
  direction: string = "row";
  layout: string = this.direction + " " + this.
  
wrap;


  noteform: FormGroup;
  constructor(private notes: NoteService,private dialog: MatDialog,
    private labelid:LabelService,private viewChange: ViewserviceService,
    private route: Router,private formBuilder: FormBuilder, private label:EditlabelService) { }

  token
  uid
  tokendecode

   lablesss
  ngOnInit() {

    this.labelid.getsetLabelName().subscribe((res => {
      debugger
     
            this.lablesss = res;
      
            this.labelname = this.lablesss.data;
            console.log("hhhhhhhhhhhhhhhhhh", this.labelname);
            this.labeledNotesotesDisplaying();
          
          }));
      
   
        
    this.timer = false;
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
}
  view;

  labelname: string;
  imagerOfNotes
  labeledNotesotesDisplaying() {
    debugger;
    const email = localStorage.getItem('email');
   let getnotes = this.label.fetchLabeledNotes(email, this.labelname);
    getnotes.subscribe((res: any) => {
      debugger
      // console.log("resabghbv", res);
      debugger;
      this.notelist = res as string[];

    });
  }


  flip() {
    debugger;
    //this.timer = false;
    this.flag = !this.flag;
  }



  setColorToTitle(changecolor) {
    debugger;
    this.color = changecolor;
    debugger

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
   * function to create notes
   * @param value 
   * @return obseravable data
   */
  notescreate(value: any) {
    debugger

    // const email = localStorage.getItem('email');
    let obj = this.notes.createNotes(value, this.uid, this.currentDateAndTime);

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
	 * var to hold image base64url
	 */
  public base64textString;
  Mainimage
  imageNoteId
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




}
