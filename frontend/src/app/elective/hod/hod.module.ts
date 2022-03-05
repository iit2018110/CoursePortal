import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HODRoutingModule } from './hod-routing.module';
import { HODComponent } from './hod.component';


@NgModule({
  declarations: [
    HODComponent
  ],
  imports: [
    CommonModule,
    HODRoutingModule
  ]
})
export class HODModule { }
