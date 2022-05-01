import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private fetch_subjects_url = 'http://localhost:3001/core/faculty/fetch_subjects';
  private submit_preferences_url = 'http://localhost:3001/core/faculty/submit_preferences';
  private get_alloted_courses_url = 'http://localhost:3001/core/faculty/get_alloted_courses';

  private reset_preferences_url = 'http://localhost:3001/core/faculty/reset_preferences'

  public courses!: any;
  public status!: string;

  constructor(private _auth: AuthService, private http: HttpClient) { }

  init() {
    this._auth.decodeJWT();

    this._auth.fetch_profile()
      .subscribe(
        res => {
          this._auth.stream = res.stream
          this.fetchSubjects()
        },
        err => console.log(err)
      )
  }

  fetchSubjects() {
    this.fetch_subjects()
      .subscribe(
        res => {
          this.status = res.status,
            this.courses = res.data
        },
        err => console.log(err)
      )
  }

  fetch_subjects() {
    let params = new HttpParams()
      .set('faculty_id', this._auth.id)
      .set('stream', this._auth.stream);
    return this.http.get<any>(this.fetch_subjects_url, { params });
  }

  get_alloted_courses() {
    let params = new HttpParams()
      .set('faculty_id', this._auth.id)
    return this.http.get<any>(this.get_alloted_courses_url, { params });
  }

  submit_preferences(data: JSON) {
    let payload = { faculty_id: this._auth.id, courses: data };
    return this.http.post<any>(this.submit_preferences_url, payload);
  }

  reset_preferences() {
    let params = new HttpParams()
      .set('faculty_id', this._auth.id);
    return this.http.delete<any>(this.reset_preferences_url, { params });
  }
}
