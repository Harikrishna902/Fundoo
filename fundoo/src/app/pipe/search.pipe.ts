import { Pipe, PipeTransform } from '@angular/core';

import { mynotes } from '../components/models/note';

@Pipe({
  name: 'searchdata'
})
export class SearchPipe implements PipeTransform {

  transform(note: any[], searchTerm: string):mynotes[] {
    console.log("__77777777777777____",searchTerm); 
    console.log("___777777777_______",note);
    if(!note || !searchTerm){
    
    return [];
  }
  console.log("__gfgdf____",note); 
  console.log("__gfgdf____",searchTerm); 
  return note.filter(notes =>
    notes.title.indexOf(searchTerm) !==-1 || notes.description.indexOf(searchTerm) !== -1 );
  }
  }

