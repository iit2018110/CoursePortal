import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';


import { StudentRoutingModule } from './student-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimeGuard } from './time.guard';


@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    AuthService,
    UtilService,
    AuthGuard,
    TimeGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class StudentModule { }
