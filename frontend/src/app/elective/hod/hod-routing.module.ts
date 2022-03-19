import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounsellingComponent } from './counselling/counselling.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacultyAssignComponent } from './faculty-assign/faculty-assign.component';
import { HODComponent } from './hod.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: '', redirectTo: 'login' },
                        { path: 'login', component: LoginComponent},
                        { path: 'dashboard', component: DashboardComponent},
                        { path: 'faculty_assign', component: FacultyAssignComponent},
                        { path: 'counselling', component: CounsellingComponent}
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HODRoutingModule { }
