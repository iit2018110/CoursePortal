import { CourseSettingComponent } from './course-setting/course-setting.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CounsellingComponent } from './counselling/counselling.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacultyAssignComponent } from './faculty-assign/faculty-assign.component';
import { ProfileComponent } from './profile/profile.component';
import { PortalStatusComponent } from 'src/app/shared/portal-status/portal-status.component';
import { TimeGuard } from './time.guard';

const routes: Routes = [{ path: '', redirectTo: 'dashboard' },
{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
{ path: 'portal_status', component: PortalStatusComponent, data: { user_type: 'elective_hod' } },
{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, TimeGuard] },
{ path: 'faculty_assign', component: FacultyAssignComponent, canActivate: [AuthGuard, TimeGuard] },
{ path: 'counselling', component: CounsellingComponent, canActivate: [AuthGuard, TimeGuard] },
{ path: 'course_setting', component: CourseSettingComponent, canActivate: [AuthGuard, TimeGuard] },
{ path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HODRoutingModule { }
