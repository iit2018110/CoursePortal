import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CourseCoordinatorRoutingModule } from './course-coordinator-routing.module';
import { CourseCoordinatorComponent } from './course-coordinator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';


@NgModule({
  declarations: [
    CourseCoordinatorComponent,
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
    UtilService
  ]
})
export class CourseCoordinatorModule { }
