import { CourseSettingComponent } from './course-setting/course-setting.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CounsellingComponent } from './counselling/counselling.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacultyAssignComponent } from './faculty-assign/faculty-assign.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{ path: '', redirectTo: 'login' },
                        { path: 'login', component: LoginComponent},
                        { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
                        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
                        { path: 'faculty_assign', component: FacultyAssignComponent, canActivate: [AuthGuard]},
                        { path: 'counselling', component: CounsellingComponent, canActivate: [AuthGuard]},
                        { path: 'course_setting', component: CourseSettingComponent, canActivate: [AuthGuard]},
                        { path: '**', redirectTo: 'dashboard'}
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HODRoutingModule { }
