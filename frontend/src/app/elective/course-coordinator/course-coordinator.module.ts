import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CourseCoordinatorRoutingModule } from './course-coordinator-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { TokenInterceptorService } from './token-interceptor.service';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    CourseCoordinatorRoutingModule,
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
export class CourseCoordinatorModule { }
