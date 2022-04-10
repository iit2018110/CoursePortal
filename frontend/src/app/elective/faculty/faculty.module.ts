import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyRoutingModule } from './faculty-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubjectPreferencesComponent } from './subject-preferences/subject-preferences.component';
import { GetStudentsComponent } from './get-students/get-students.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    SubjectPreferencesComponent,
    GetStudentsComponent
  ],
  imports: [
    CommonModule,
    FacultyRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    UtilService,
    AuthGuard
  ]
})
export class FacultyModule { }
