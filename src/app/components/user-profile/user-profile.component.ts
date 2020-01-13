import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/User.model';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileForm: FormGroup;
  userData: any=[];
  dataSource: MatTableDataSource<UserModel>;
  displayedColumns: string[] = ['_id', 'firstName', 'lastName', 'email', 'password', 'dob'];

  constructor(private router: Router, private fb: FormBuilder) { 
    this.profileForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dob: ''
    })

    if (this.userData !== undefined) {
      this.userData = this.router.getCurrentNavigation().extras.state.userData;
    }
  }

  ngOnInit() {
    if (this.userData.isAdmin) {
      this.dataSource = this.userData;
    }
  }

}
