import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import {CustomMaterialModule} from './material.module';

import { FlexLayoutModule } from "@angular/flex-layout"
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import{} from '@angular/forms';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ResetComponent } from './components/reset/reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SimpleComponent } from './components/simple/simple.component';
import { NotesComponent } from './components/notes/notes.component';

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
    SimpleComponent,
    NotesComponent,
   
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
    HttpClientModule
 
  ],
  /**
   * includes the services created
   */
  providers: [],
  /**
   * main component for starting the excution
   */
  bootstrap: [AppComponent]
})
export class AppModule { }
