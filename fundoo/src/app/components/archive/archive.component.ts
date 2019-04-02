import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import {ArchiveService} from '../../services/archive/archive.service';
import { Notes } from '../models/archive';
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  constructor(private arch : ArchiveService) { }
  notes: Notes[] = [];
  ngOnInit() {
  }

  getArchive(){
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    const uid = tokenPayload.id;

    let obj = this.arch.getArchive(uid);
    obj.subscribe((res:any)=>{
      this.notes = res;
    }) 
  } 


  unarchive(id,flag){
    debugger

    let archive = this.arch.unarchived(id,flag);
    archive.subscribe((res:any)=>{

    });


  }
}
