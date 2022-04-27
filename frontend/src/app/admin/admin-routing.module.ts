import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BasketComponent } from './basket/basket.component';
import { AuthGuard } from './auth.guard';
import { RunningCoursesComponent } from './running-courses/running-courses.component';
import { FacultyPreferencesComponent } from './faculty-preferences/faculty-preferences.component';
import { CourseFacultyComponent } from './course-faculty/course-faculty.component';
import { StudentPreferencesComponent } from './student-preferences/student-preferences.component';
import { CourseStudentsComponent } from './course-students/course-students.component';
import { FacultyPreferencesCoreComponent } from './faculty-preferences-core/faculty-preferences-core.component';
import { CourseFacultyCoreComponent } from './course-faculty-core/course-faculty-core.component';
import { PortalSettingComponent } from './portal-setting/portal-setting.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { FacultyLoadchartComponent } from './faculty-loadchart/faculty-loadchart.component';
import { FacultyLoadchartCoreComponent } from './faculty-loadchart-core/faculty-loadchart-core.component';

const routes: Routes = [
  { path: '', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  { path: 'portal_setting', component: PortalSettingComponent, canActivate: [AuthGuard] },

  { path: 'elective/basket', component: BasketComponent, canActivate: [AuthGuard] },
  { path: 'elective/running_courses', component: RunningCoursesComponent, canActivate: [AuthGuard] },
  { path: 'elective/faculties_preference', component: FacultyPreferencesComponent, canActivate: [AuthGuard] },
  { path: 'elective/courses_faculty', component: CourseFacultyComponent, canActivate: [AuthGuard] },
  { path: 'elective/student_preferences', component: StudentPreferencesComponent, canActivate: [AuthGuard] },
  { path: 'elective/course_students', component: CourseStudentsComponent, canActivate: [AuthGuard] },
  { path: 'elective/faculty_loadchart', component: FacultyLoadchartComponent, canActivate: [AuthGuard]},

  { path: 'project/project_management', component: ProjectManagementComponent, canActivate: [AuthGuard] },

  { path: 'core/faculties_preference', component: FacultyPreferencesCoreComponent, canActivate: [AuthGuard] },
  { path: 'core/courses_faculty', component: CourseFacultyCoreComponent, canActivate: [AuthGuard] },
  { path: 'core/faculty_loadchart', component: FacultyLoadchartCoreComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
