import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import {CustomMaterialModule} from './material.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule,} from '@angular/material/datepicker';
import { FlexLayoutModule } from "@angular/flex-layout"
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {MatMenuModule} from '@angular/material/menu';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import{} from '@angular/forms';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ResetComponent } from './components/reset/reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatDialogModule} from "@angular/material";

import { NotesComponent } from './components/notes/notes.component';
import { SearchPipe } from './pipe/search.pipe';
import { EditnotesComponent } from './components/editnotes/editnotes.component';
import { ReminderComponent } from './components/reminder/reminder.component';
//import { NotegridComponent } from './components/notegrid/notegrid.component';

@NgModule({
  /**
   * array of components created
   */
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    ResetComponent,
    DashboardComponent,
  
    NotesComponent,
  
    SearchPipe,
  
    EditnotesComponent,
  
    ReminderComponent,
    
    //NotegridComponent,
    
  ],
  /**
   * array of modules required to be used in application
   */
  imports: [
    BrowserModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    FlexLayoutModule,ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatMenuModule,
    MatDatepickerModule,
    MatDialogModule,
    //MatNativeDateModule
  ],
  /**
   * includes the services created
   */
  providers: [],
  /**
   * main component for starting the excution
   */
  bootstrap: [AppComponent],
  /**
   * In order for the component to be usable as a dialog body, 
   * we need to declare it as an entryComponent
   */
  entryComponents: [EditnotesComponent]
})
export class AppModule { }
