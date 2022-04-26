import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private post_status_by_faculty_url = 'http://localhost:3001/project/faculty/post_status_by_faculty';
  private get_detail_project_url = 'http://localhost:3001/project/faculty/get_detail_project';

  constructor(private _auth: AuthService, private http: HttpClient) { }

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

  get_detail_project() {
    let params = new HttpParams().set('faculty_id', this._auth.id);
    return this.http.get<any>(this.get_detail_project_url, { params });
  }

  post_status_by_faculty(projectId: string, status: string) {
    let payload = { project_id: projectId, faculty_id: this._auth.id, status: status };
    return this.http.post<any>(this.post_status_by_faculty_url, payload);
  }
}
