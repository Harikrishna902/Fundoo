import { Pipe, PipeTransform } from '@angular/core';

import { mynotes } from '../components/models/note';

@Pipe({
  name: 'searchdata'
})
export class SearchPipe implements PipeTransform {

  transform(note: any[], searchTerm: string):mynotes[] {
    if(!note || !searchTerm){
    return [];
  }

  return note.filter(notes =>
    notes.title.indexOf(searchTerm) !==-1 || notes.noteContent.indexOf(searchTerm) !== -1 );
  }
  }

