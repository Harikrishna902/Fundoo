
import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,MatDatepickerModule,MatNativeDateModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule, MatSidenavModule, MatDrawerContainer, MatListModule,
} from '@angular/material';
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
  //MatDrawerContainer,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule

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
   MatNativeDateModule
   ],
})
export class CustomMaterialModule { }