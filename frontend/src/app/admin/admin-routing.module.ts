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

const routes: Routes = [
  { path: '', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'elective/basket', component: BasketComponent, canActivate: [AuthGuard] },
  { path: 'elective/running_courses', component: RunningCoursesComponent, canActivate: [AuthGuard] },
  { path: 'elective/faculties_preference', component: FacultyPreferencesComponent, canActivate: [AuthGuard] },
  { path: 'elective/courses_faculty', component:  CourseFacultyComponent, canActivate: [AuthGuard]},
  { path: 'elective/student_preferences', component: StudentPreferencesComponent, canActivate: [AuthGuard] },
  { path: 'elective/course_students', component: CourseStudentsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
