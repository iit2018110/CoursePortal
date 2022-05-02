//Angular Imports
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

//Rxjs Imports
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Services
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | boolean | UrlTree {

    return this._auth.verifyLoggedIn().pipe(
      map((res) => {
        if (res === true) {
          return true;
        }
        else {
          alert("Please login first");
          this.router.navigate(['elective/login']);
          return false;
        }
      })
    );

  }



}



