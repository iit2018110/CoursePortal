import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  @Input() name: string ="";
  @Input() email:string="";

  constructor(private router: Router) { }
  logout(){
    localStorage.removeItem('token_admin');
    this.router.navigate(['/admin/login']);
  }

}
