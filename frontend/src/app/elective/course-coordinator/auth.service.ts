import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

import jwt_decode, { JwtPayload } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // profile details
  public id!: string;
  public name!: string;
  public email!: string;
  public stream!: string; //IT or ECE
  public basket_id!: string; 

  private login_url = 'http://localhost:3000/elective/cc/login';
  private fetch_profile_url = 'http://localhost:3000/elective/cc/profile';
  private token_verify_url = 'http://localhost:3000/jwt/verify_token';

  constructor(private http: HttpClient) { }


  userLogin(email: string, password: string) {
    return this.http.post<any>(this.login_url, {email: email, password: password});
  }

  verifyLoggedIn():Observable<boolean>{
    let token = localStorage.getItem('token_cc');
    if(!token) return observableOf(false);
    return this.http.post<any>(this.token_verify_url, {token: token});
  }

  fetchProfile() {
    let token = localStorage.getItem('token_cc') as string;
    let decoded_token = jwt_decode<any>(token);
    this.id = decoded_token.id;
    this.name = decoded_token.name;
    this.email = decoded_token.email;
    
    this.http.get<any>(this.fetch_profile_url)
    .subscribe(
      res => {
        this.stream = res.stream,
        this.basket_id = res.basket_id;
      },
      err => console.log(err)
    )
  }
}
