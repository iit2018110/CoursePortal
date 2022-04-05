import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HODRoutingModule } from './hod-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacultyAssignComponent } from './faculty-assign/faculty-assign.component';
import { CounsellingComponent } from './counselling/counselling.component';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    FacultyAssignComponent,
    CounsellingComponent
  ],
  imports: [
    CommonModule,
    HODRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    UtilService,
    AuthGuard
  ]
})
export class HODModule { }
