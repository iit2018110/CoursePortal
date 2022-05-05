import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBuffer_course } from 'src/app/models/buffer_course';
import { IRunning_course } from 'src/app/models/running_course';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private fetch_subjects_url = 'http://localhost:3001/elective/faculty/fetch_subjects';
  private fetch_students_url = 'http://localhost:3001/elective/faculty/fetch_students';
  private submit_preferences_url = 'http://localhost:3001/elective/faculty/submit_preferences';
  private reset_preferences_url = 'http://localhost:3001/elective/faculty/reset_preferences'

  private get_alloted_courses_url = 'http://localhost:3001/elective/faculty/get_alloted_courses';

  /**Course coordinatores URL */
  private fetch_cc_dashboard_url = 'http://localhost:3001/elective/cc/get_dashboard';

  private accept_course_url = 'http://localhost:3001/elective/cc/accept_course';
  private reject_course_url = 'http://localhost:3001/elective/cc/reject_course';
  private restore_course_url = 'http://localhost:3001/elective/cc/restore_course';
  private submit_courses_url = 'http://localhost:3001/elective/cc/submit_courses';
  private reset_courses_url = 'http://localhost:3001/elective/cc/reset_courses';

  public baskets!: any;
  public courses!: any;
  public status!: string;
  
  public courses_alloted!: any;
  /**
   * Course coordinators variables
   */
   public cc_status!: string; //running or buffer
   public running_courses!: IRunning_course[];
   public buffer_courses!: IBuffer_course[];

  constructor(private _auth: AuthService, private http: HttpClient) { }

  init() {
    this._auth.decodeJWT();

    this._auth.fetch_profile()
    .subscribe(
      res => {
        this._auth.stream = res.stream
        this.getAllotedCourses();
        this.fetchSubjects(),
        this.fetchStudents()
      },
      err => console.log(err)
    )
  }

  //
  cc_init() {
    this._auth.decodeJWT();

    this._auth.fetch_cc_profile()
    .subscribe(
      res => {
        this._auth.stream = res.stream,
        this._auth.basket_id = res.basket_id,
        this.fetchCCDashboard()
      },
      err => console.log(err)
    )
  }

  fetchCCDashboard() {
    this.fetch_cc_dashboard()
    .subscribe(
      res => {
        this.cc_status = res.status
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

  fetch_cc_dashboard() {
    let params = new HttpParams()
                  .set('basket_id', this._auth.basket_id);

    return this.http.get<any>(this.fetch_cc_dashboard_url, {params})
  }

  getAllotedCourses() {
    this.get_alloted_courses().subscribe(
      res => this.courses_alloted = res,
      err => console.log(err)
    )
  }
/* private fetch_dashboard_url = 'http://localhost:3001/elective/cc/get_dashboard';
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
  } */

  fetchSubjects() {
    this.fetch_subjects()
    .subscribe(
      res => {
        
        this.status = res.status,
        this.baskets = res.data,
        console.log("status is", this.status)
      },
      err => console.log(err)
    )
  }

  fetchStudents() {
    this.fetch_students().subscribe(
      res => this.courses = res,
      err => console.log(err)
    )
  }

  fetch_subjects() {
    let params = new HttpParams()
                  .set('faculty_id', this._auth.id)
                  .set('stream', this._auth.stream);
    return this.http.get<any>(this.fetch_subjects_url, {params});
  }

  fetch_students() {
    let params = new HttpParams()
                  .set('faculty_id', this._auth.id)
    return this.http.get<any>(this.fetch_students_url, {params});
  }

  get_alloted_courses() {
    let params = new HttpParams()
                  .set('faculty_id', this._auth.id)
    return this.http.get<any>(this.get_alloted_courses_url, {params});
  }

  submit_preferences(data: JSON) {
    let payload = {faculty_id: this._auth.id, courses: data};
    return this.http.post<any>(this.submit_preferences_url, payload);
  }

  reset_preferences() {
    let params = new HttpParams()
                  .set('faculty_id', this._auth.id);
    return this.http.delete<any>(this.reset_preferences_url, {params});
  }

  /**
   * Course coordinator functionality
   */
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
    return this.http.post<any>(this.submit_courses_url, {basket_id: this._auth.basket_id, stream: this._auth.stream});
  }

  reset_running_courses() {
    let params = new HttpParams()
                  .set('basket_id', this._auth.basket_id)
    return this.http.delete<any>(this.reset_courses_url, {params});
  }
}
