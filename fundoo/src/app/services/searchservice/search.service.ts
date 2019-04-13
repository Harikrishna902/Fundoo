import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class searchService {
  private searchWord:string;


  constructor() { }
  subject=new Subject();
  getSearch()
  {

    this.setSearchWord(this.searchWord);
    return this.subject.asObservable();
  }

  setSearchWord(searchTerm:string)
  {
   // debugger;
    this.searchWord=searchTerm;
    
    this.subject.next({data:searchTerm})
    
}

}




