import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalStatusComponent } from 'src/app/shared/portal-status/portal-status.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{ path: '', redirectTo: 'login' },
{ path: 'login', component: LoginComponent },
{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
{ path: 'portal_status', component: PortalStatusComponent, data: {startTime: 1, endTime: 5}},
{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
{ path: '**', redirectTo: 'dashboard'}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
