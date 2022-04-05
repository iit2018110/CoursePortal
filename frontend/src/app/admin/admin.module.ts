import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { BasketComponent } from './basket/basket.component';
import { UtilService } from './util.service';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    BasketComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    UtilService,
    AuthGuard
  ]
})
export class AdminModule { }
