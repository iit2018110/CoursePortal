import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student.component';

const routes: Routes = [{ path: '', redirectTo: 'login' },
                        { path: 'login', component: LoginComponent } ,
                        { path: 'dashboard', component: DashboardComponent } 
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
