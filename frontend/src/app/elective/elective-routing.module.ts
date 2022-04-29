import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectiveComponent } from './elective.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: '', redirectTo: 'login'},
                        { path: 'login', component: LoginComponent },
                        { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
                        { path: 'faculty', loadChildren: () => import('./faculty/faculty.module').then(m => m.FacultyModule) },
                        { path: 'hod', loadChildren: () => import('./hod/hod.module').then(m => m.HODModule) },
                        { path: 'cc', loadChildren: () => import('./course-coordinator/course-coordinator.module').then(m => m.CourseCoordinatorModule) },
                        { path: '**', redirectTo: ''}
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectiveRoutingModule { }
