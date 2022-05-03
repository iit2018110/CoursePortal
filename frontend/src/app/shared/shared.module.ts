import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { PortalStatusComponent } from './portal-status/portal-status.component';
import { UtilService } from './util.service';
import { OrdinalPipe } from './pipes/ordinal.pipe';

@NgModule({
  declarations: [
    SharedComponent,
    PortalStatusComponent,
    OrdinalPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  providers: [UtilService],
  exports: [
    PortalStatusComponent,
    OrdinalPipe
  ]
})
export class SharedModule { }
