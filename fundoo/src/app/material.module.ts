
import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {DragDropModule} from '@angular/cdk/drag-drop';
//import { MessagingService } from "./messaging.service";


//import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material'
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatCheckboxModule, MatInputModule, MatTableModule,MatDatepickerModule,MatNativeDateModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule, MatSidenavModule, MatDrawerContainer, MatListModule, MatDialogRef, MAT_DIALOG_DATA,
} from '@angular/material';

import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
  imports: [
  CommonModule, 
  MatToolbarModule,
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatDialogModule,
  MatCheckboxModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
  DragDropModule,

 
  ],
  exports: [
  CommonModule,
   MatToolbarModule, 
   MatButtonModule, 
   MatCardModule, 
   MatInputModule, 
   MatDialogModule, 
   MatTableModule, 
   MatMenuModule,
   MatIconModule,
   MatDatepickerModule,
   MatProgressSpinnerModule,
   MatSidenavModule,
   MatDrawerContainer,
   MatListModule,
   MatNativeDateModule,
   MatChipsModule,
   MatTooltipModule,
   MatDialogModule,
   DragDropModule,
   MatCheckboxModule,

],

providers:[{ provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: [] },
  ] 
 })



export class CustomMaterialModule { }