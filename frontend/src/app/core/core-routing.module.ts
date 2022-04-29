import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: '', redirectTo: 'login'},
{ path: 'login', component: LoginComponent },
{ path: 'faculty', loadChildren: () => import('./faculty/faculty.module').then(m => m.FacultyModule) },
{ path: 'hod', loadChildren: () => import('./hod/hod.module').then(m => m.HodModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
