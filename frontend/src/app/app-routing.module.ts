import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{path: '', component: HomeComponent},
                        { path: 'elective', loadChildren: () => import('./elective/elective.module').then(m => m.ElectiveModule) },
                        { path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) }
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
