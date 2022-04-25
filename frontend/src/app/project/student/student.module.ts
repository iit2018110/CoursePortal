import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { UtilService } from './util.service';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    HttpClientModule,
    SharedModule
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
export class StudentModule { }
