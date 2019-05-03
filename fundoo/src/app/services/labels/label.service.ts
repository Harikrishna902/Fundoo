import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor() { }

  labelName =new Subject();
  word:string;
  setLabelName(value:any){
    // debugger;
    this.word =value;
      this.labelName.next({data:value});
    
    
  } 

  getsetLabelName(){
    // debugger
    console.log("getlabelname",this.word)
    this.setLabelName(this.word);
    /**
     * Creates a new Observable with this Subject as the source. You can do this
     * to create customize Observer-side logic of the Subject and conceal it from
     * code that uses the Observable.
     * @return {Observable} Observable that the Subject casts to
     */
    return this.labelName.asObservable();
  }
  
}
