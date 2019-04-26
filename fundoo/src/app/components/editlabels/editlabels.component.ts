import { Component, OnInit, Inject } from '@angular/core';
import {Label } from '../models/labels';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import {EditlabelService } from '../../services/editlabels/editlabel.service';
@Component({
  selector: 'app-editlabels',
  templateUrl: './editlabels.component.html',
  styleUrls: ['./editlabels.component.scss']
})
export class EditlabelsComponent implements OnInit {
  labelform: FormGroup
  uid:any;
  labels: Label[];
  constructor(public dialogRef: MatDialogRef<EditlabelsComponent>,
    public dialog: MatDialog, private fb: FormBuilder, private labelserv:EditlabelService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      debugger
      this.uid= this.data.data;
    }
  
  ngOnInit() {
    this.labelform = this.fb.group({
      labelname: '',

    });
    this.getLabel();
  }

  /**
   * function for close method
   * @param value 
   */
  send(value: any) {
    debugger
    let obj = this.labelserv.setLabel(this.uid,value);
    obj.subscribe((res: any) => {                                                     

    });
  }

  closeslabel(){
    this.dialogRef.close();
  }
 
  
  label
/**label
 * function to get labels
 */
  getLabel() {
    debugger
    let obj = this.labelserv.getLabel(this.uid);

    obj.subscribe((res: any) => {
      debugger
      this.label= res;
      console.log("hv",this.label);
    })
  } 

/**
 * function to delete the label
 * @param id 
 */
  deletelabel(id){
    debugger
    let labelobs = this.labelserv.deletelabel(id);
    labelobs.subscribe((res: any) => {

        this.getLabel();
    })
  }
  
  editLabel(id){
    debugger
    let labelobs = this.labelserv.updatelabel(id);
    labelobs.subscribe((res: any) => {

        this.getLabel();
    })
  }

  // updateLabel = new FormGroup();
  // editLabel(id){

  //   this.model= {
  //     "updateLabel" : this.updateLabel.value
  //   }

  //   // console.log(id);
  //   // console.log(this.updateLabel);
  //    let editLab = this.labelserv.updatelabel(this.email, this.model,id );
  //    editLab.subscribe((re:any)=>{

  //    });
  // }
}
