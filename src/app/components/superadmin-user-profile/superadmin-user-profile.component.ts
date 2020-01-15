import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { UserModel } from 'src/app/shared/User.model';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-superadmin-user-profile',
  templateUrl: './superadmin-user-profile.component.html',
  styleUrls: ['./superadmin-user-profile.component.css']
})
export class SuperadminUserProfileComponent implements OnInit {
  superAdminForm: FormGroup;
  userData: any = [];
  dataSource: MatTableDataSource<UserModel>;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'password', 'dob', 'edit', 'delete'];
  editFlag = false;
  editedUser = [];

  constructor(private router: Router, private fb: FormBuilder, private service: ApiService) {
    this.superAdminForm = this.fb.group({
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
    if (this.userData.isAdmin && !isUndefined(this.userData)) {
      this.getAllUsers();
    }
  }

  editSuperAdmin(id) {
    this.editFlag = true;
    this.service.getUserById(id).subscribe(data => {
      this.superAdminForm.patchValue(data);
      this.editedUser = data;
    })
  }

  getAllUsers() {
    this.service.getAllUsers().subscribe(userList => {
      this.dataSource = userList;
      this.superAdminForm.reset();
      this.editFlag = false;
      this.editedUser = [];
    })
  }

  deleteStudent(e) {
    if (window.confirm('Are you sure')) {
      this.service.deleteUser(e._id).subscribe(data => {
        this.getAllUsers();
      })
    }
  }

  updateUserProfile(id) {
    if (this.superAdminForm.valid) {
      console.log(id);
      console.log(this.superAdminForm.value);
      if (id !== undefined) {
        if (window.confirm('Are you sure you want to update?')) {
          this.service.updateUserProfile(id, this.superAdminForm.value).subscribe(updatedData => {
            this.editFlag = false;
            this.editedUser = [];
            this.getAllUsers();
          });
        }
      } else if (id === undefined) {
        if (window.confirm('Are you sure you want to add user?')) {
          this.service.register(this.superAdminForm.value).subscribe(updatedData => {
            this.editFlag = false;
            this.editedUser = [];
            this.getAllUsers();
          });
        }
      }
    }
  }

  addUser() {
    this.editFlag = true;
  }

  logout() {
    this.service.logout().subscribe(data => {
      if(data === 'successful') {
        this.router.navigateByUrl('logout');
      }
    });
  }
}
