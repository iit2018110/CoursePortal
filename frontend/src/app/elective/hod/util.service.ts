import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private fetch_baskets_url = 'http://localhost:3001/elective/hod/fetch_baskets';
  private fetch_faculties_url = 'http://localhost:3001/elective/hod/fetch_faculties';
  private assign_courses_url = 'http://localhost:3001/elective/hod/assign_courses';
  private unassign_courses_url = 'http://localhost:3001/elective/hod/unassign_courses';
  private submit_assigned_courses_url = 'http://localhost:3001/elective/hod/submit_assigned_courses';


  private fetch_basket_preferences_url = 'http://localhost:3001/elective/hod/fetch_basket_preferences';
  private students_counselling_url = 'http://localhost:3001/elective/hod/students_counselling';
  private submit_students_couselling_url = 'http://localhost:3001/elective/hod/submit_students_counselling';

  private fetch_basket_subjects_url = 'http://localhost:3001/elective/hod/fetch_basket_subjects';
  private run_course_url = 'http://localhost:3001/elective/hod/run_course';
  private stop_course_url = 'http://localhost:3001/elective/hod/stop_course';

  private reset_course_faculty_url = 'http://localhost:3001/elective/hod/reset_assigned_courses';

  private reset_course_students_url = 'http://localhost:3001/elective/hod/reset_course_students';

  public status!: string;
  public selected_baskets!: any;
  public buffer_baskets!: any;
  public basket_faculties!: any;

  public counselling_status!: string;
  public basket_preferences: any;
  public course_students: any = {};

  public baskets!: any;

  constructor(private _auth: AuthService, private http: HttpClient) { }

  init() {
    this._auth.decodeJWT();

    this._auth.fetch_profile()
    .subscribe(
      res => {
        this._auth.stream = res.stream;
        this.fetchBaskets();
        this.fetchFaculties();
        this.fetchBasketPreferences();
        this.fetchBasketSubjects();
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

  fetchBasketPreferences() {
    this.fetch_basket_preferences().subscribe(
      res => {
        this.counselling_status = res.status,
        this.basket_preferences = res.data
      },
      err => console.log(err)
    )
  }

  fetchBasketSubjects() {
    this.fetch_basket_subjects().subscribe(
      res => {
        this.baskets = res;
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

  unassign_courses(basketId: string) {
    let payload = {basket_id: basketId};
    return this.http.put<any>(this.unassign_courses_url, payload);
  }

  submit_assigned_courses() {
    let payload = {stream: this._auth.stream};
    return this.http.post<any>(this.submit_assigned_courses_url, payload);
  }


  /**
   * Student counselling.
   */

  fetch_basket_preferences() {
    let params = new HttpParams()
                      .set('stream', this._auth.stream);
    return this.http.get<any>(this.fetch_basket_preferences_url, {params});
  }

  students_counselling() {
    let payload = {stream: this._auth.stream};
    return this.http.post<any>(this.students_counselling_url, payload);
  }

  submit_students_couselling() {
    let payload = {stream: this._auth.stream};
    return this.http.post<any>(this.submit_students_couselling_url, payload);
  }

  /**
   * Couse setting.
   */
  fetch_basket_subjects() {
    let params = new HttpParams()
                      .set('stream', this._auth.stream);
    return this.http.get<any>(this.fetch_basket_subjects_url, {params});
  }

  run_course(basketId: string, courseId: string) {
    let payload = {stream: this._auth.stream, basket_id: basketId, course_id: courseId};
    return this.http.put<any>(this.run_course_url, payload);
  }

  stop_course(basketId: string, courseId: string) {
    let payload = {stream: this._auth.stream, basket_id: basketId, course_id: courseId};
    return this.http.put<any>(this.stop_course_url, payload);
  }

  reset_assigned_courses(){
    let params = new HttpParams()
                      .set('stream', this._auth.stream);
    return this.http.delete<any>(this.reset_course_faculty_url, {params});
  }

  reset_course_students(){
    let params = new HttpParams()
                      .set('stream', this._auth.stream);
    return this.http.delete<any>(this.reset_course_students_url, {params});
  }
}
