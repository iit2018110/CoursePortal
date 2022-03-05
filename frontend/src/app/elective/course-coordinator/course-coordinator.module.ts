import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCoordinatorRoutingModule } from './course-coordinator-routing.module';
import { CourseCoordinatorComponent } from './course-coordinator.component';


@NgModule({
  declarations: [
    CourseCoordinatorComponent
  ],
  imports: [
    CommonModule,
    CourseCoordinatorRoutingModule
  ]
})
export class CourseCoordinatorModule { }
