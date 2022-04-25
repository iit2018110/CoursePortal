import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalStatusComponent } from 'src/app/shared/portal-status/portal-status.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TimeGuard } from './time.guard';

const routes: Routes = [{ path: '', redirectTo: 'login' },
{ path: 'login', component: LoginComponent },
{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
{ path: 'portal_status', component: PortalStatusComponent, data: { user_type: 'elective_cc' } },
{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, TimeGuard] },
{ path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseCoordinatorRoutingModule { }
