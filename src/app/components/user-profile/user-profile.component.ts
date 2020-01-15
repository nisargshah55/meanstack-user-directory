import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/User.model';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {

  profileForm: FormGroup;
  editedUser: any = [];
  editFlag = false;
  userData: any = [];

  constructor(private router: Router, private fb: FormBuilder, private service: ApiService) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      dob: ['', Validators.required],
    })

    if(this.router.getCurrentNavigation().extras.state !== undefined) {
      this.userData = this.router.getCurrentNavigation().extras.state.userData;
    }
  }

  ngOnInit() {
  }

  editUserProfile(id) {
    this.editFlag = true;
    this.service.getUserById(id).subscribe(data => {
      this.profileForm.patchValue(data);
      this.editedUser = data;
    })
  }

  updateUserProfile(id) {
    console.log(id);
    console.log(this.profileForm.value);
    if (window.confirm('Are you sure you want to update?')) {
      this.service.updateUserProfile(id, this.profileForm.value).subscribe(updatedData => {
        this.editFlag = false;
        this.editedUser = [];
        this.service.getUserById(updatedData._id).subscribe(user => {
          this.userData = user;
        })
      });
    }
  }

  logout() {
    this.service.logout().subscribe(data => {
      if(data === 'successful') {
        this.router.navigateByUrl('logout');
      }
    });
  }
}
