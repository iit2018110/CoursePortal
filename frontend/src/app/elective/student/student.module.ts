import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';


@NgModule({
  declarations: [
    StudentComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ],
  providers: [
    AuthService,
    UtilService
  ]
})
export class StudentModule { }
