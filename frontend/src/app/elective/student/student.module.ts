import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';


import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    StudentComponent,
    LoginComponent,
    ProfileComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    UtilService
  ]
})
export class StudentModule { }
