import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SuperadminUserProfileComponent } from './components/superadmin-user-profile/superadmin-user-profile.component';
import { LoginGuard } from './login.guard';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', redirectTo: 'login', canActivate: [LoginGuard]},
  {path: 'user_profile', component: UserProfileComponent, canActivate: [LoginGuard]},
  {path: 'superadmin_user_profile', component: SuperadminUserProfileComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
