import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project.component';

const routes: Routes = [{ path: '', redirectTo: 'login'},
                        { path: 'login', component: LoginComponent },
                        { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
                        { path: 'faculty', loadChildren: () => import('./faculty/faculty.module').then(m => m.FacultyModule) },
                        { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
