import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HodRoutingModule } from './hod-routing.module';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';
import { AuthGuard } from './auth.guard';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimeGuard } from './time.guard';


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    HodRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    UtilService,
    AuthGuard,
    TimeGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    HttpClientModule,
    HttpClient
  ]
})
export class HodModule { }
