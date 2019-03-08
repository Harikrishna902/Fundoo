import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import{ForgotComponent} from './components/forgot/forgot.component';
/**
 * const which defines variables
 */
const routes: Routes = [
{path : '' ,component :LoginComponent},
{path : 'login',component : LoginComponent},
{path :'register',component :RegisterComponent},
{path :'forgot',component : ForgotComponent},

];
/**
 * The forRoot() method returns an NgModule and its provider dependencies.
 */
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
declarations: []
})
export class AppRoutingModule { }