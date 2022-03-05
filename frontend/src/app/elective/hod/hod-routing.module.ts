import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HODComponent } from './hod.component';

const routes: Routes = [{ path: '', component: HODComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HODRoutingModule { }
