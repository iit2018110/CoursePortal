import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private login_url = 'http://localhost:3001/admin/login';
  private token_verify_url = 'http://localhost:3001/jwt/verify_token'

  constructor(private http: HttpClient) { }

  userLogin(email: string, password: string) {
    return this.http.post<any>(this.login_url, {email: email, password: password});
  }

  verifyLoggedIn():Observable<boolean>{
    let token = localStorage.getItem('token_admin');
    if(!token) return observableOf(false);
    return this.http.post<any>(this.token_verify_url, {token: token});
  }
}
