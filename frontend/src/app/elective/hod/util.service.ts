import { Injectable } from '@angular/core';
import { IAssigned_basket } from '../../models/assined_basket';
import { AuthService } from './auth.service';
import { IUnassigned_basket } from '../../models/unassigned_basket';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  


  public assigned_basket_courses!: IAssigned_basket[];
  public unassigned_basket_courses!: IUnassigned_basket[];

  constructor(private _auth: AuthService) { }

  init() {
    this._auth.decodeJWT();

    this._auth.fetch_profile()
    .subscribe(
      res => {
        this._auth.stream = res.stream
        
      },
      err => console.log(err)
    )
  }

  
}
