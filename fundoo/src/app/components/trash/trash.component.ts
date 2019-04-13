import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { NoteService } from '../../services/noteservice/note.service';
import { Notes } from '../models/archive';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  constructor(private noteser: NoteService) { }

  ngOnInit() {
    this.trashnotes();
  }
  notes: Notes[] = [];



  trashnotes(){

    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    const email = tokenPayload.email;
    let obj= this.noteser.trashnote(email);
    obj.subscribe((res:any)=>{
      this.notes = res;
    })
  }


/**
   * @method resatoreNote()
   * @return void
   * @param id
   * @description Function to restore note
   */
restoreNote(id,value){
    debugger
      let obj = this.noteser.restoreNote(id);
  
      obj.subscribe((res:any)=>{
        if(res.status=="200"){
          debugger
          this.notes.forEach(note => {
            if(note.id==id){
              note.trash=value;
             
              this.trashnotes();
            }
        });
  
        }
      })
    }


   /**
   * @method deleteNote()
   * @return void
   * @param id
   * @description Function to delete the note permanetly
   */
    deletNote(id){
      debugger
      let remobs = this.noteser.notedelete(id);
  
      remobs.subscribe((res:any)=>{
        debugger
        console.log(res,"abc");
        if(res.status=="200"){
          this.notes.forEach(note => {
            if(note.id==id){
              debugger
              console.log(note,"dss");
              note.id=''
              note.color=''
              note.email=''
              note.notes=''
              note.remainder=''
              note.title=''
              
              
              this.trashnotes();
            }
        });
        }
  
      })
    }



    /**
     * @method to displaynotes()
     * @description to display notes
     * @return void
     */
    fetchnotes(){
      const token = localStorage.getItem('token');
      const tokenPayload = decode(token);
      const id = tokenPayload.id;
      let notesobs = this.noteser.displayNotes(id);
  
      notesobs.subscribe((data: any) => {
        
        this.notes = data;
    })
  }
}
