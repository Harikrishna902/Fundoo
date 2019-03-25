/************************************************************************************************
* Execution : 1. default node cmd> dashboard.ts 
* 
* Purpose : dashboard 
* 
* @file : dashboard.ts
* @module : dashboard.ts - This is optional if expeclictly its an npm or local package
* @author : harikrishna <nalluri.harikrishna1@gmail.com>
* @since : 19-3-2019
*
*************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { ViewserviceService } from '../../services/viewservice/viewservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  email: string;
  isClicked = false;
  constructor(private route: Router, private viewChange: ViewserviceService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    var decoded = decode(token);
    this.email = decoded.email;
  }


  isclick() {
    return false;
  }

  addAccount() {
    this.route.navigate(['register']);
  }

  signout() {
    this.route.navigate(['login']);
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }
  alert = "Note Archieved";
  action = "undo";



  Change() {
    this.viewChange.onViewchange();
  }
}