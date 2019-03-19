import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NoteService } from '../../services/noteservice/note.service';
import decode from 'jwt-decode';
import { Router } from '@angular/router';
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
  //createNotes:string;
  noteform: FormGroup;
  constructor(private formBuilder: FormBuilder, private notes: NoteService, private route: Router) { }

  ngOnInit() {

    this.noteform = this.formBuilder.group({
      title: '',
      description: '',

    });

    this.getNotes();

  }

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
    this.flag = !this.flag;


  }



  notescreate(value: any) {
    debugger
    const email = localStorage.getItem('email');
    let obj = this.notes.createNotes(value, email);

    obj.subscribe((res: any) => {
      debugger
      console.log(res.status);
      if (res.status == "200") {
        this.tokenOne = res.token;
      }
    });
  }
}





