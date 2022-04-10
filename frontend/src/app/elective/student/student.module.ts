import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';


import { StudentRoutingModule } from './student-routing.module';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
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
    UtilService,
    AuthGuard
  ]
})
export class StudentModule { }
