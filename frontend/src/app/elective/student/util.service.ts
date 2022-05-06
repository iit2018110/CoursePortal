import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBufferStudentPreferenceBasket } from 'src/app/models/buffer_student_preference_basket';
import { IStudentPreferenceBasket } from 'src/app/models/student_basket_preference';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private fetch_dashboard_url = 'http://localhost:3001/elective/student/get_dashboard';
  private choose_preferences_url = 'http://localhost:3001/elective/student/choose_preferences';
  private remove_preferences_url = 'http://localhost:3001/elective/student/remove_preferences';
  private submit_preferences_url = 'http://localhost:3001/elective/student/submit_preferences';
  private fetch_alloted_courses_url = 'http://localhost:3001/elective/student/fetch_alloted_courses'

  private reset_preferences_url = 'http://localhost:3001/elective/student/reset_preferences'

  public status!: string; //running or buffer
  public buffer_baskets!: IBufferStudentPreferenceBasket[];
  public baskets!: IStudentPreferenceBasket[];
  public alloted_courses!: any;

  constructor(private _auth: AuthService, private http: HttpClient) { }

  init() {
    this._auth.decodeJWT();

    this._auth.fetch_profile()
    .subscribe(
      res => {
        this._auth.stream = res.stream,
        this._auth.gpa = res.gpa,
        this._auth.degree = res.degree,
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
        if(res.status === 'filled') {
          this.baskets = res.baskets;
          this.fetchAllotedCourses();
        }
        else {
          this.buffer_baskets = res.baskets;
        }
      },
      err => console.log(err)
    )
  }

  fetchAllotedCourses() {
    this.fetch_alloted_courses().subscribe(
      res => this.alloted_courses = res,
      err => console.log(err)
    )
  }

  fetch_dashboard() {
    let params = new HttpParams()
                  .set('student_id', this._auth.id)
                  .set('stream', this._auth.stream);

    return this.http.get<any>(this.fetch_dashboard_url, {params})
  }

  fetch_alloted_courses() {
    let params = new HttpParams()
                  .set('student_id', this._auth.id);
    return this.http.get<any>(this.fetch_alloted_courses_url, {params})
  }

  choose_preferences(basketId: string, p1_id:string, p1_name: string, p2_id:string, p2_name: string, p3_id:string, p3_name: string, p4_id:string, p4_name: string, p5_id:string, p5_name: string) {
    let payload = {student_id: this._auth.id, basket_id: basketId, p1_id: p1_id, p1_name: p1_name, p2_id:p2_id, p2_name: p2_name, p3_id:p3_id, p3_name: p3_name, p4_id:p4_id, p4_name: p4_name, p5_id:p5_id, p5_name: p5_name};
    return this.http.put<any>(this.choose_preferences_url, payload);
  }

  remove_preferences(basketId: string) {
    let payload = {student_id: this._auth.id, basket_id: basketId};
    return this.http.put<any>(this.remove_preferences_url, payload);
  }

  submit_preferences() {
    return this.http.post<any>(this.submit_preferences_url, {student_id: this._auth.id});
  }

  reset_preferences() {
    let params = new HttpParams()
                  .set('student_id', this._auth.id);
    return this.http.delete<any>(this.reset_preferences_url, {params})
  }
}
