import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { CustomMaterialModule } from './material.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { FlexLayoutModule } from "@angular/flex-layout"
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { } from '@angular/forms';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ResetComponent } from './components/reset/reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { NotesComponent } from './components/notes/notes.component';
import { SearchPipe } from './pipe/search.pipe';
import { EditnotesComponent } from './components/editnotes/editnotes.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { SocialLoginModule,AuthServiceConfig,GoogleLoginProvider,FacebookLoginProvider,} from "angular-6-social-login";
import {getAuthServiceConfigs} from './socialloginconfig';
import { LabelComponent } from './components/label/label.component';
import { EditlabelsComponent } from './components/editlabels/editlabels.component';

import { ArchiveComponent } from './components/archive/archive.component';
import { AuthService as auth } from './services/auth/auth.servicee';
import { CookieService } from 'ngx-cookie-service';
import { TrashComponent } from './components/trash/trash.component';

//import {MatDialogRef} from '@angular/material';
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
    LabelComponent,
    EditlabelsComponent,
    ArchiveComponent,
    TrashComponent,
    

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
    FlexLayoutModule, ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatMenuModule,
    MatDatepickerModule,
    MatDialogModule,
    SocialLoginModule,
    
    //GoogleLoginProvider,
    //FacebookLoginProvider,
  ],
  /**
   * includes the services created
   */
  providers: [{ provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: [] },CookieService,
 auth, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  
  /**
   * main component for starting the excution
   */
  bootstrap: [AppComponent],
  /**
   * In order for the component to be usable as a dialog body, 
   * we need to declare it as an entryComponent
   */
  entryComponents: [EditnotesComponent, EditlabelsComponent]
})
export class AppModule { }
