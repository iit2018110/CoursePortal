import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseCoordinatorComponent } from './course-coordinator.component';

const routes: Routes = [{ path: '', component: CourseCoordinatorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseCoordinatorRoutingModule { }
