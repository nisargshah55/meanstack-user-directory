import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  formErrors: any;
  regValidator: boolean;

  constructor(private fb: FormBuilder, private service: ApiService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      dob: ['', Validators.required],
    })

    this.formErrors = {
      firstName: {},
      lastName: {},
      email: {},
      password: {},
      dob: {}
    };
  }

  ngOnInit() {
    this.registerForm.valueChanges.subscribe(() => {
      this.service.onFormValuesChanged(this.formErrors, this.registerForm);
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }


  register() {
    if (this.registerForm.valid) {
      this.user = this.registerForm.value;
      this.regValidator = false;
      this.service.register(this.user).subscribe(data => {
        if (data === 'email exists') {

        } else {
        this.router.navigateByUrl('login');
        }
      });
    }
  }

}
