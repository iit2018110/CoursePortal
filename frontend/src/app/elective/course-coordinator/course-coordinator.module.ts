import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CourseCoordinatorRoutingModule } from './course-coordinator-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CourseCoordinatorRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    UtilService,
    AuthGuard
  ]
})
export class CourseCoordinatorModule { }
