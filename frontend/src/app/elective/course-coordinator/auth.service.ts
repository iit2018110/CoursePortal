import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private login_url = 'http://localhost:3000/elective/cc/login';

  constructor(private http: HttpClient) { }


  userLogin(email: string, password: string) {
    return this.http.post<any>(this.login_url, {email: email, password: password});
  }
}
