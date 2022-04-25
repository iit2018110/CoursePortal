import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { PortalStatusComponent } from './portal-status/portal-status.component';
import { UtilService } from './util.service';

@NgModule({
  declarations: [
    SharedComponent,
    PortalStatusComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  providers: [UtilService],
  exports: [
    PortalStatusComponent
  ]
})
export class SharedModule { }
