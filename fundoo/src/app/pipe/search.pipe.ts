import { Pipe, PipeTransform } from '@angular/core';

import { mynotes } from '../components/models/note';

@Pipe({
  name: 'searchdata'
})
export class SearchPipe implements PipeTransform {

  transform(note: any[], searchTerm: string):mynotes[] {
    console.log("__7____",searchTerm); 
    console.log("_________",note);
    if(!note || !searchTerm){
    
    return [];
  }
  console.log("______",note); 
  console.log("______",searchTerm); 
  return note.filter(notes =>
    notes.title.indexOf(searchTerm) !==-1 || notes.description.indexOf(searchTerm) !== -1 );
  }
  }

