import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBufferStudentPreferenceBasket } from 'src/app/models/buffer_student_preference_basket';
import { IProjectPost } from 'src/app/models/project_post';
import { IStudentPreferenceBasket } from 'src/app/models/student_basket_preference';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private get_faculty_list_url = 'http://localhost:3001/project/student/get_faculty_list';
  private post_project_by_student_url = 'http://localhost:3001/project/student/post_project_by_student';
  private post_status_by_student_url = 'http://localhost:3001/project/student/post_status_by_student';
  private get_detail_project_url = 'http://localhost:3001/project/student/get_detail_project'

  constructor(private _auth: AuthService, private http: HttpClient) { }

  init() {
    this._auth.decodeJWT();

    this._auth.fetch_profile()
      .subscribe(
        res => {
          this._auth.stream = res.stream,
          this._auth.gpa = res.gpa,
            this._auth.degree = res.degree
        },
        err => console.log(err)
      )
  }

  get_faculty_list() {
    return this.http.get<any>(this.get_faculty_list_url);
  }

  get_detail_project() {
    let params = new HttpParams().set('student_id', this._auth.id);
    return this.http.get<any>(this.get_detail_project_url, { params });
  }

  post_status_by_student(projectId: string, status: string) {
    let payload = { project_id: projectId, student_id: this._auth.id, status: status };
    return this.http.post<any>(this.post_status_by_student_url, payload);
  }

  post_project_by_student(payload: IProjectPost) {
    return this.http.post<any>(this.post_project_by_student_url, payload);
  }
}
