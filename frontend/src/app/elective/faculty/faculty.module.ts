import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyRoutingModule } from './faculty-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubjectPreferencesComponent } from './subject-preferences/subject-preferences.component';
import { GetStudentsComponent } from './get-students/get-students.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimeGuard } from './time.guard';


@NgModule({
  declarations: [
    DashboardComponent,
    SubjectPreferencesComponent,
    GetStudentsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FacultyRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
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
    }
  ]
})
export class FacultyModule { }
