import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';

import jwt_decode, { JwtPayload } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private login_url = 'http://localhost:3001/project/login';
  private token_verify_url = 'http://localhost:3001/jwt/verify_token';

  constructor(private http: HttpClient, private router: Router) { }

  decodeJWT(token: string) {
    let decoded_token = jwt_decode<any>(token);

    return decoded_token.userType;
  }

  userLogin(email: string, password: string) {
    return this.http.post<any>(this.login_url, { email: email, password: password });
  }

  verifyLoggedIn(): Observable<boolean> {
    let token_faculty = localStorage.getItem('token_faculty');
    if(token_faculty) {
    return this.http.post<any>(this.token_verify_url, { token: token_faculty });
    }

    let token_student = localStorage.getItem('token_student');
    if(token_student) {
    return this.http.post<any>(this.token_verify_url, { token: token_student });
    }

    return observableOf(false);
  }
}
