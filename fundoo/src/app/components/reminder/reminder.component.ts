import { Component, OnInit } from '@angular/core';
import { ReminderService } from '../../services/reminderservice/reminder.service';
import { Note } from '../models/reminder';
import { NoteService } from '../../services/noteservice/note.service';
import decode from 'jwt-decode';
//import { FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  //noteform: FormGroup;
  constructor(private reminders : ReminderService,private notes: NoteService,) { }
  note: Note[] = [];
  ngOnInit() {
    this.reminder();
  }


  
  reminder(){

    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    const id = tokenPayload.email;
    debugger
    let reminderobj = this.reminders.getreminder(id);
    reminderobj.subscribe((res:any)=>{
      debugger
      this.notes = res;
    })
  }




   /**
   * function to get notes
   * return obseravble 
   */
  getNotes() {
    debugger
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    const emailid = tokenPayload.email;
    debugger
    let noteobj = this.notes.displayNotes(emailid);
    noteobj.subscribe((data: any) => {
      debugger
      this.note = data;
    });
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
}
