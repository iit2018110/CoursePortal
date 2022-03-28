import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetStudentsComponent } from './get-students/get-students.component';
import { LoginComponent } from './login/login.component';
import { SubjectPreferencesComponent } from './subject-preferences/subject-preferences.component';

const routes: Routes = [{ path: '', redirectTo: 'login' },
                        { path: 'login', component: LoginComponent } ,
                        { path: 'dashboard', component: DashboardComponent },
                        { path: 'subject_preference', component: SubjectPreferencesComponent},
                        { path: 'get_students', component: GetStudentsComponent } 
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyRoutingModule { }
