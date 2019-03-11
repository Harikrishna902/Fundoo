import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginserviceService } from '../../services/loginservice/loginservice.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})

export class ResetComponent implements OnInit
{
  model: any;
  response: any;
  errormsg = '';

  ResetForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private S_login: LoginserviceService ) { }

  ngOnInit() {
    this.ResetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
     // confirm: ['', Validators.required]
    
    });

}
login() {
  if(this.ResetForm.invalid){
    return;
  }
  debugger;
  let obj = this.S_login.UserLoginData(this.ResetForm.value);

  /**
   * error handling and 
   * sends response  
   */
  debugger;
  obj.subscribe((res: any) => {
    console.log(res.message);
    if (res.message == "200") {
      this.errormsg = "reset link has been sent to your mail \n ";
    } else {
      this.errormsg = "mail not registered";
    } 
  });

}


}