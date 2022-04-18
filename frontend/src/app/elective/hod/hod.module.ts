import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HODRoutingModule } from './hod-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacultyAssignComponent } from './faculty-assign/faculty-assign.component';
import { CounsellingComponent } from './counselling/counselling.component';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { CourseSettingComponent } from './course-setting/course-setting.component';
import { TokenInterceptorService } from './token-interceptor.service';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    FacultyAssignComponent,
    CounsellingComponent,
    ProfileComponent,
    CourseSettingComponent
  ],
  imports: [
    CommonModule,
    HODRoutingModule,
    FormsModule,
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
export class HODModule { }
