import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TimeGuard implements CanActivate {

  constructor(private _auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._auth.get_portal_timing().pipe(
      map((res) => {
        if(!res) {
          return true;
        }

        let token_cc = localStorage.getItem('token_cc');
        if(token_cc) {
          return true;
        }

        let currTime = new Date().getTime();
        let startTime = new Date(res.start_time).getTime();
        let endTime = new Date(res.end_time).getTime();

        if (currTime >= startTime && currTime <= endTime) {
          return true;
        }
        else {
          this.router.navigate(['elective/faculty/portal_status']);
          return false;
        }
      })
    );
  }

}
