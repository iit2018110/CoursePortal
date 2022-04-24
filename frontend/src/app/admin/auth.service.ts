import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';

import jwt_decode, { JwtPayload } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private login_url = 'http://localhost:3001/admin/login';
  private token_verify_url = 'http://localhost:3001/jwt/verify_token'

  public id!: string;
  public name!: string;
  public email!: string;

  constructor(private http: HttpClient, private router: Router) { }

  decodeJWT() {
    let token = localStorage.getItem('token_admin') as string;
    let decoded_token = jwt_decode<any>(token);

    this.id = decoded_token.id;
    this.name = decoded_token.name;
    this.email = decoded_token.email;
  }

  userLogin(email: string, password: string) {
    return this.http.post<any>(this.login_url, {email: email, password: password});
  }

  verifyLoggedIn():Observable<boolean>{
    let token = localStorage.getItem('token_admin');
    if(!token) return observableOf(false);
    return this.http.post<any>(this.token_verify_url, {token: token});
  }

  userLogout() {
    localStorage.removeItem('token_admin');
    this.router.navigate(['/admin/login']);
  }
}
