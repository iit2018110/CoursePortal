import { NavbarComponent } from './../navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { PortalSettingComponent } from './portal-setting/portal-setting.component';
import { PortalSettingService } from './portal-setting.service';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { FacultyLoadchartComponent } from './faculty-loadchart/faculty-loadchart.component';
import { FacultyLoadchartCoreComponent } from './faculty-loadchart-core/faculty-loadchart-core.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';


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
    CourseFacultyCoreComponent,
    PortalSettingComponent,
    ProjectManagementComponent,
    FacultyLoadchartComponent,
    FacultyLoadchartCoreComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    AuthService,
    UtilService,
    PortalSettingService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
})
export class AdminModule { }
