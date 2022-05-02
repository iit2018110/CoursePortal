import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private fetch_baskets_url = 'http://localhost:3001/core/hod/fetch_courses';
  private fetch_faculties_url = 'http://localhost:3001/core/hod/fetch_faculties';
  private assign_courses_url = 'http://localhost:3001/core/hod/assign_courses';
  private unassign_courses_url = 'http://localhost:3001/core/hod/unassign_courses';
  private submit_assigned_courses_url = 'http://localhost:3001/core/hod/submit_assigned_courses';
  private reset_course_faculty_url = 'http://localhost:3001/core/hod/reset_assigned_courses';
  public status!: string;
  public selected_baskets!: any;
  public buffer_baskets!: any;
  public basket_faculties!: any;

  constructor(private _auth: AuthService, private http: HttpClient) { }

  init() {
    this._auth.decodeJWT();

    this._auth.fetch_profile()
    .subscribe(
      res => {
        this._auth.stream = res.stream;
        this.fetchBaskets();
        this.fetchFaculties();
      },
      err => console.log(err)
    )
  }

  fetchBaskets() {
    this.fetch_baskets().subscribe(
      res => {
        this.status = res.status;
        if(res.status==='buffer') {
          this.buffer_baskets = res.data;
        } else {
          this.selected_baskets = res.data;
        }
      },
      err => console.log(err)
    )
  }

  fetchFaculties() {
    this.fetch_faculties().subscribe(
      res => {
        this.basket_faculties = res;
      },
      err => console.log(err)
    )
  }

  fetch_baskets() {
    let params = new HttpParams()
                     .set('stream', this._auth.stream);
    return this.http.get<any>(this.fetch_baskets_url, {params});
  }

  fetch_faculties() {
    let params = new HttpParams()
                      .set('stream', this._auth.stream);
    return this.http.get<any>(this.fetch_faculties_url, {params});
  }

  assign_courses(courses: any) {
    let payload = {data: courses};
    return this.http.put<any>(this.assign_courses_url, payload);
  }

  unassign_courses(semester: any) {
    let payload = {semester: semester};
    return this.http.put<any>(this.unassign_courses_url, payload);
  }

  submit_assigned_courses() {
    let payload = {stream: this._auth.stream};
    return this.http.post<any>(this.submit_assigned_courses_url, payload);
  }

  reset_assigned_courses(){
    let params = new HttpParams()
                      .set('stream', this._auth.stream);
    return this.http.delete<any>(this.reset_course_faculty_url, {params});
  }
}
