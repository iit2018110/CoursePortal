import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortalSettingService {
  private get_portal_timing_url = 'http://localhost:3001/admin/get_portal_timing';
  private set_portal_timing_url = 'http://localhost:3001/admin/set_portal_timing';

  constructor(private http: HttpClient) { }

  get_portal_timing() {
    let params = new HttpParams()
                  .set('user_type','admin')
    return this.http.get<any>(this.get_portal_timing_url, {params});
  }

  set_portal_timing(userType: string, startTime: string, endTime: string) {
    let payload = {user_type: userType, start_time: startTime, end_time: endTime};
    return this.http.put<any>(this.set_portal_timing_url, payload);
  }
}
