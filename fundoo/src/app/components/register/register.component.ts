import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder,FormGroup,Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  /*
  message = '';
  selected: '';
  hide = true;
  model: any;
  responce: any;
  message1='';*/ 
  registerForm:FormGroup;
  // FirstName = new FormControl('', [Validators.required]);
  // Lastname = new FormControl('', [Validators.required]);
  // username = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('', [Validators.required]);
  // confirm = new FormControl('', [Validators.required]);
  // service = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm=this.formBuilder.group({
      FirstName: ['', Validators.required],
      Lastname: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', Validators.required]
    });
  }

}
