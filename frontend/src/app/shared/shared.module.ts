import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { PortalStatusComponent } from './portal-status/portal-status.component';

@NgModule({
  declarations: [
    SharedComponent,
    PortalStatusComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    PortalStatusComponent
  ]
})
export class SharedModule { }
