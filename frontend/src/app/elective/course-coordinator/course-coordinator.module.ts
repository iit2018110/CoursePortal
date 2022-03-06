import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCoordinatorRoutingModule } from './course-coordinator-routing.module';
import { CourseCoordinatorComponent } from './course-coordinator.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CourseCoordinatorComponent
  ],
  imports: [
    CommonModule,
    CourseCoordinatorRoutingModule,
    SharedModule
  ]
})
export class CourseCoordinatorModule { }
