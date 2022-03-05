import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectiveRoutingModule } from './elective-routing.module';
import { ElectiveComponent } from './elective.component';


@NgModule({
  declarations: [
    ElectiveComponent
  ],
  imports: [
    CommonModule,
    ElectiveRoutingModule
  ]
})
export class ElectiveModule { }
