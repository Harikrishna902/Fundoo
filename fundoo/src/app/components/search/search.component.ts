import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { NoteService } from '../../services/noteservice/note.service';
import { searchService } from '../../services/searchservice/search.service';
import { mynotes } from '../models/note';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  mynotes: string[];
  word: string;
  constructor(private notes: NoteService,private data: searchService) { }

  ngOnInit() {

  
      this.onClick()
      this.displayResult()
    
  }

  onClick()
  {
    debugger;
    const tokens = localStorage.getItem('token');
    const tokenPayload = decode(tokens);
    const email = tokenPayload.email;
    let obj = this.notes.displayNotes(email);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
      
      obj.subscribe((data: any) => {
        debugger;
        this.mynotes= data as string[];
        
      });
     this.displayResult();
  }
res

  displayResult()
  {
    debugger;
     this.data.getSearch().subscribe(
      (response)=>{
this.res=response
this.word=this.res.data;
console.log('____yyyyyyy_________',this.res.data)
      }
    );

   
  }


}
