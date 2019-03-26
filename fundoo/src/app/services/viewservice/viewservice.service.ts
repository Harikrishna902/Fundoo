import { Injectable } from '@angular/core';
//import {  BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

//import { Observable } from "rxjs/Observable";
@Injectable({
  providedIn: 'root'
})
export class ViewserviceService {
//   private currentView=new BehaviorSubject(true);
//  subscribeView=this.currentView.asObservable();
//   private abc: boolean;
  result:boolean = true;
  subject = new Subject();

  constructor() { }

// onViewchange(){
//   //console.log("subsjghjghjg")
//   this.subscribeView.subscribe(
//     (response:boolean) =>{
//       console.log("reponse:"+response);
//      //this.abc=response;
//     this.currentView.next(response);

//     }
//   )
  
// }
getView() {
  this.gridview();
  return this.subject.asObservable();
}
gridview(){
  if(this.result){
    this.subject.next({data:"row"});
    this.result = false;
  }
  else{
    this.subject.next({data:"column"});
    this.result = true;
  }
} 
}