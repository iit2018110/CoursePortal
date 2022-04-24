import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{path: '', component: HomeComponent},
                        { path: 'elective', loadChildren: () => import('./elective/elective.module').then(m => m.ElectiveModule) },
                        { path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
                        { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
                        { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
                        { path: 'core', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) }
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
