import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{path: '', redirectTo: 'login'},
                        {path: 'login', component: LoginComponent},
                        {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
                        {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyRoutingModule { }
