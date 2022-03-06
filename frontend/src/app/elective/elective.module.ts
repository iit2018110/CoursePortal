import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectiveRoutingModule } from './elective-routing.module';
import { ElectiveComponent } from './elective.component';
import { SharedModule } from '../shared/shared.module';
// import { LoginComponent } from '../shared/login/login.component';


@NgModule({
  declarations: [
    ElectiveComponent,
  ],
  imports: [
    CommonModule,
    ElectiveRoutingModule,
  ]
})
export class ElectiveModule { }
