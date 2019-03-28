import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from "moment";
@Component({
  selector: 'app-editnotes',
  templateUrl: './editnotes.component.html',
  styleUrls: ['./editnotes.component.scss']
})
export class EditnotesComponent implements OnInit {
  form: FormGroup;
 // description:string;
  title:any;
  description:any;
  date: any;
  /**
	 * var to hold present time
	 */
  currentdate: any;
  currentDateAndTime: any;

  timer: any;
  
  fulldate: any
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditnotesComponent>,
   /**
    * A parameter decorator on a dependency parameter of a class 
    * constructor that specifies a custom provider of the dependency.
    */
    @Inject(MAT_DIALOG_DATA) data) {
      this.description = data.description;
     }
    
  ngOnInit() {
    this.form = this.fb.group({
      title :'',
      description: ''
     
  });
  }


  close(value:any) {
    debugger
    this.dialogRef.close();
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
}
