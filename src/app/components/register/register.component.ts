import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { UserModel } from 'src/app/shared/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: UserModel;

  constructor(private fb: FormBuilder, private service: ApiService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dob: ''
    })
   }

  ngOnInit() {
  }

  register() {
    this.user = this.registerForm.value;

    this.service.register(this.user).subscribe(() => {
      this.router.navigateByUrl('login');
    });
  }

}
