import { Injectable } from '@angular/core';
import { IAssigned_basket } from '../../models/assined_basket';
import { AuthService } from './auth.service';
import { IUnassigned_basket } from '../../models/unassigned_basket';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private fetch_baskets_url = 'http://localhost:3001/elective/hod/fetch_baskets';
  
  public status!: string;
  public baskets!: any;
  // public assigned_basket_courses!: IAssigned_basket[];
  // public unassigned_basket_courses!: IUnassigned_basket[];

  constructor(private _auth: AuthService, private http: HttpClient) { }

  init() {
    this._auth.decodeJWT();

    this._auth.fetch_profile()
    .subscribe(
      res => {
        this._auth.stream = res.stream;
        this.fetchBaskets();
      },
      err => console.log(err)
    )
  }

  fetchBaskets() {
    this.fetch_baskets().subscribe(
      res => this.baskets = res,
      err => console.log(err) 
    )
  }

  fetch_baskets() {
    let params = new HttpParams()
                     .set('stream', this._auth.stream);
    return this.http.get<any>(this.fetch_baskets_url, {params});
  }
}
