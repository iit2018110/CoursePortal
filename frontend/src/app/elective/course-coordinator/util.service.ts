import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBuffer_course } from 'src/app/models/buffer_course';
import { IRunning_course } from 'src/app/models/running_course';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private fetch_dashboard_url = 'http://localhost:3001/elective/cc/get_dashboard';
  private accept_course_url = 'http://localhost:3001/elective/cc/accept_course';
  private reject_course_url = 'http://localhost:3001/elective/cc/reject_course';
  private restore_course_url = 'http://localhost:3001/elective/cc/restore_course';
  private submit_courses_url = 'http://localhost:3001/elective/cc/submit_courses';

  public status!: string; //running or buffer
  public running_courses!: IRunning_course[];
  public buffer_courses!: IBuffer_course[];

  constructor(private _auth: AuthService, private http: HttpClient) { }


  init() {
    this._auth.decodeJWT();

    this._auth.fetch_profile()
    .subscribe(
      res => {
        this._auth.stream = res.stream,
        this._auth.basket_id = res.basket_id,
        this.fetchDashboard()
      },
      err => console.log(err)
    )
  }

  fetchDashboard() {
    this.fetch_dashboard()
    .subscribe(
      res => {
        this.status = res.status
        if(res.status === 'running') {
          this.running_courses = res.data;
          console.log("running courses",this.running_courses);
        } 
        else {
          this.buffer_courses = res.data;
          console.log("buffer courses",this.buffer_courses);
        } 
      },
      err => console.log(err)
    )
  }

  fetch_dashboard() {
    let params = new HttpParams()
                  .set('basket_id', this._auth.basket_id);

    return this.http.get<any>(this.fetch_dashboard_url, {params})
  }

  accept_course(courseId: string) {
    let payload = {course_id: courseId, basket_id: this._auth.basket_id};
    return this.http.put<any>(this.accept_course_url, payload);
  }

  reject_course(courseId: string) {
    let payload = {course_id: courseId, basket_id: this._auth.basket_id};
    return this.http.put<any>(this.reject_course_url, payload);
  }

  restore_course(courseId: string) {
    let payload = {course_id: courseId, basket_id: this._auth.basket_id};
    return this.http.put<any>(this.restore_course_url, payload);
  }

  submit_courses() {
    return this.http.post<any>(this.submit_courses_url, {basket_id: this._auth.basket_id});
  }
}
