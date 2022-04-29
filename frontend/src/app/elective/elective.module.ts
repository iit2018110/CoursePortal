import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectiveRoutingModule } from './elective-routing.module';
import { ElectiveComponent } from './elective.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import { LoginComponent } from '../shared/login/login.component';


@NgModule({
  declarations: [
    ElectiveComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ElectiveRoutingModule
  ],
  providers: [AuthService]
})
export class ElectiveModule { }
