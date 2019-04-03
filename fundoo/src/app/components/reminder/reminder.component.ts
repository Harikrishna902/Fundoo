import { Component, OnInit } from '@angular/core';
import { ReminderService } from '../../services/reminderservice/reminder.service';
import { Notes } from '../models/reminder';

import decode from 'jwt-decode';
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  constructor(private reminders : ReminderService) { }
  notes: Notes[] = [];
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
}
