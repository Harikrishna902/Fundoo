import { Injectable } from '@angular/core';
import {  BehaviorSubject } from 'rxjs';
//import { Observable } from "rxjs/Observable";
@Injectable({
  providedIn: 'root'
})
export class ViewserviceService {
  private currentView=new BehaviorSubject(true);
subscribeView=this.currentView.asObservable();
  private abc: boolean;

  constructor() { }

onViewchange(){
  //console.log("subsjghjghjg")
  this.subscribeView.subscribe(
    (response:boolean) =>{
    //  this.abc=responce;
    this.currentView.next(!response);

    }
  )
  
}
}