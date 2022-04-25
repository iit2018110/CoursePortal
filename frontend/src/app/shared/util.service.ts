import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private get_portal_timing_url = 'http://localhost:3001/admin/get_portal_timing';

  constructor(private http: HttpClient) { }

  get_portal_timing(userType: string) {
    let params = new HttpParams()
      .set('user_type', userType);
    return this.http.get<any>(this.get_portal_timing_url, { params });
  }
}
