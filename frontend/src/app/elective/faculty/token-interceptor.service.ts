//Angular Imports
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

//Rxjs Imports
import { Observable } from 'rxjs';

//Services
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token_faculty');
    let newHeaders = req.headers.append('Authorization', 'Bearer ' + token);

    let tokenizedRequest = req.clone({headers: newHeaders});

    return next.handle(tokenizedRequest);
  }
}
