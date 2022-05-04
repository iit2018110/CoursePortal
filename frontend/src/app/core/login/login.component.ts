import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginErr = false;

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this._auth.verifyLoggedIn()
      .subscribe(
        res => {
          if (res) {
            let token_hod = localStorage.getItem('token_hod');
            if (token_hod) {
              this.router.navigate(['/core/hod/dashboard']);
            }
    
            let token_faculty = localStorage.getItem('token_faculty');
            if (token_faculty) {
              this.router.navigate(['/core/faculty/dashboard']);
            }
          }
        },
        err => console.log(err)
      )
  }

  onClick(email: string, password: string) {
    this._auth.userLogin(email, password)
      .subscribe(
        res => {
          let userType = this._auth.decodeJWT(res);
          if(userType == 'cc'){
            localStorage.setItem('token_cc', res);
            localStorage.setItem('token_faculty', res);
            this.router.navigate(['/core/faculty/dashboard']);
          }
          else if (userType == 'hod') {
            localStorage.setItem('token_hod', res);
            this.router.navigate(['/core/hod/dashboard']);
          } else if (userType == 'faculty') {
            localStorage.setItem('token_faculty', res);
            this.router.navigate(['/core/faculty/dashboard']);
          }
        },
        err => {
          this.loginErr = true,
            console.log(err)
        }
      )
  }
}
