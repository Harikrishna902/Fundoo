
import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';

//import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material'
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,MatDatepickerModule,MatNativeDateModule,
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
 
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
 
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
],

providers:[{ provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: [] },
  ] 
 })



export class CustomMaterialModule { }