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
  email:any;
  labels: Label[];
  constructor(public dialogRef: MatDialogRef<EditlabelsComponent>,
    public dialog: MatDialog, private fb: FormBuilder, private label:EditlabelService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      debugger
      this.email= this.data.data;
    }
  
  ngOnInit() {
    this.labelform = this.fb.group({
      labelname: '',

    });
    this.getLabel;
  }

  /**
   * function for close method
   * @param value 
   */
  close(value: any) {
    debugger
    let obj = this.label.setLabel(this.email, value);
    obj.subscribe((res: any) => {

    });
  }


/**
 * function to get labels
 */
  getLabel() {
    debugger
    let obj = this.label.getLabel(this.email);

    obj.subscribe((res: any) => {
      debugger
      this.labels = res;
    })
  }
}
