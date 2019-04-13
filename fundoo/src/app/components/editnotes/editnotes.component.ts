import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from "moment";
import { NoteService } from '../../services/noteservice/note.service';


@Component({
  selector: 'app-editnotes',
  templateUrl: './editnotes.component.html',
  styleUrls: ['./editnotes.component.scss']
})
export class EditnotesComponent implements OnInit {
  form: FormGroup;
  colour: any;
  title: any;
  description: any;
  date: any;
  id;
  note;
  /**
	 * var to hold present time
	 */
  currentdate: any;
  currentDateAndTime: any;
  reminder: any;
  timer: any;

  fulldate: any
  constructor(private fb: FormBuilder, private notes: NoteService,
    private dialogRef: MatDialogRef<EditnotesComponent>,
    /**
     * A parameter decorator on a dependency parameter of a class 
     * constructor that specifies a custom provider of the dependency.
     */
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.description = this.data.notesdata.description;
    this.title = this.data.notesdata.title;
    this.id = this.data.notesdata.id;
    this.colour = this.data.notesdata.colour;
    this.reminder=this.data.notesdata.reminder;
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: '',
      description: ''

    });
  }




  status
  notebackground
  close(value: any) {
    console.log(value);
    this.notebackground = value.color;
    this.dialogRef.close();
    let update = this.notes.updateNotes(value, this.id);
    update.subscribe((res: any) => {
      if (res.status == "200") {
        this.status = "update";
      }

    })
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

  closeDate()
  {
    this.timer = false;
    this.currentDateAndTime = undefined;
    
  }

  
}
