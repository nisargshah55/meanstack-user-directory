import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/User.model';
import { isNull } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: UserModel;
  
  constructor(private fb: FormBuilder, private service: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    })
   }

  ngOnInit() {
  }

  login() {
    this.user = this.loginForm.value;

    this.service.login(this.user).subscribe(userData => {
      console.log(userData);
      if(userData) {
       this.router.navigateByUrl('user_profile', { state: {userData: userData}});
      }
    })
  }

}
