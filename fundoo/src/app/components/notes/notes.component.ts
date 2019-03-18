import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {NoteService } from '../../services/noteservice/note.service';
import decode from 'jwt-decode';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  flag = true;
  email:string;
  response: any;
  note:string;
  
  description:"";
  tokenOne:"";
  //createNotes:string;
  NoteForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private notes: NoteService) { }

  ngOnInit() {
  }
  //   this.NoteForm = this.fb.group({
  //     desc: '',
  //     title: ''
  //   });

  //   this.getNotes();

  // }
 
  // getNotes() {
  //   const token = localStorage.getItem('token');
  //   const tokenPayload = decode(token);
  //   const emailid = tokenPayload.email;
  //   debugger
  //   let noteobj = this.notes.displayNotes(emailid);
  //   noteobj.subscribe((data: any) => {
  //     this.note = data as string;
  //   });
  // }


  
  flip( value:any)
  {
    debugger;
    this.flag = !this.flag;
  
    const email = localStorage.getItem('email');
    let obj = this.notes.createNotes(value,email);

    obj.subscribe((res: any) => {
      debugger
      console.log(res.status);
      if (res.status == "200") {
        this.tokenOne = res.token;
      } 
    });
  
}
}
  




