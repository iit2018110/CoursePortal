import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { BasketComponent } from './basket/basket.component';
import { UtilService } from './util.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { RunningCoursesComponent } from './running-courses/running-courses.component';
import { FacultyPreferencesComponent } from './faculty-preferences/faculty-preferences.component';
import { CourseFacultyComponent } from './course-faculty/course-faculty.component';
import { StudentPreferencesComponent } from './student-preferences/student-preferences.component';
import { CourseStudentsComponent } from './course-students/course-students.component';
import { FacultyPreferencesCoreComponent } from './faculty-preferences-core/faculty-preferences-core.component';
import { CourseFacultyCoreComponent } from './course-faculty-core/course-faculty-core.component';


@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    BasketComponent,
    RunningCoursesComponent,
    FacultyPreferencesComponent,
    CourseFacultyComponent,
    StudentPreferencesComponent,
    CourseStudentsComponent,
    FacultyPreferencesCoreComponent,
    CourseFacultyCoreComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    UtilService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class AdminModule { }
