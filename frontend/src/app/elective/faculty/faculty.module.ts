import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyRoutingModule } from './faculty-routing.module';
import { FacultyComponent } from './faculty.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubjectPreferencesComponent } from './subject-preferences/subject-preferences.component';
import { GetStudentsComponent } from './get-students/get-students.component';


@NgModule({
  declarations: [
    FacultyComponent,
    LoginComponent,
    DashboardComponent,
    SubjectPreferencesComponent,
    GetStudentsComponent
  ],
  imports: [
    CommonModule,
    FacultyRoutingModule
  ]
})
export class FacultyModule { }
