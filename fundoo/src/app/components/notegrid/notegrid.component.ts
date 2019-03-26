// import { Component, OnInit, Input, Output,ViewChild,AfterViewInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { EventEmitter } from 'events';
// import { ViewserviceService } from '../../services/viewservice/viewservice.service';
// import { searchService } from '../../services/searchservice/search.service';
// @Component({
//   selector: 'app-notegrid',
//   templateUrl: './notegrid.component.html',
//   styleUrls: ['./notegrid.component.scss']
// })

// export class NotegridComponent implements OnInit {
//   private subscribeView : boolean;
//   flag= false;
//   private toggle: any = false;
//   constructor(private viewChange: ViewserviceService,private data: searchService,private route: Router) { }
//   @Input() Search;
//   @Input() card;
//   @Output() child=new EventEmitter ();
//   @Input() arrayCards;
 
//   parentmessage : true;
//   ngOnInit() {
//     this.switchView();
//     this.viewChange.subscribeView.subscribe(view =>{
//       this.subscribeView = view;
//     })
//   }


// switchView() {
//   {
//     this.data.viewList.subscribe(message => {
//       console.log("swithc"+message);
//       this.toggle = message;
//     });
//   }
// }
// }

