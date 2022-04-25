import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyRoutingModule } from './faculty-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { UtilService } from './util.service';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FacultyRoutingModule,
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
export class FacultyModule { }
