import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BasketComponent } from './basket/basket.component';

const routes: Routes = [{ path: '', redirectTo: 'login' },
                        { path: 'login', component: LoginComponent },
                        { path: 'home', component: HomeComponent },
                        { path: 'profile', component: ProfileComponent },
                        { path: 'elective/basket', component: BasketComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
