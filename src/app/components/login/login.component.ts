import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  formErrors: any;
  loginValidator: boolean;

  constructor(private fb: FormBuilder, private service: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.formErrors = {
      email: {},
      password: {}
    };
  }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe(() => {
      this.service.onFormValuesChanged(this.formErrors, this.loginForm);
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.user = this.loginForm.value;

      this.service.login(this.user).subscribe(userData => {
        if (userData !== null && userData.isAdmin === false) {
          this.router.navigateByUrl('user_profile', { state: { userData: userData } });
        }  else if (userData !== null && userData.isAdmin === true) {
          this.router.navigateByUrl('superadmin_user_profile', { state: { userData: userData } });
        } else if(userData === null) {
          this.loginValidator = false;
        }
      })
    }
  }

}
