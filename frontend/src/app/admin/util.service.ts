import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBasket } from '../models/basket';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private BASKET_URL = "http://localhost:3001/admin/elective/basket/";

  private fetch_it_faculties_url = this.BASKET_URL + "fetch_it_faculties";
  private fetch_ece_faculties_url = this.BASKET_URL + "fetch_ece_faculties";

  private fetch_it_baskets_url = this.BASKET_URL + "fetch_it_baskets";
  private fetch_ece_baskets_url = this.BASKET_URL + "fetch_ece_baskets";
  private create_basket_url = this.BASKET_URL + "create_basket";
  private add_course_url = this.BASKET_URL + "add_course";
  private delete_course_url = this.BASKET_URL + "delete_course";
  private delete_basket_url = this.BASKET_URL + "delete_basket";

  private ELECTIVE_URL = 'http://localhost:3001/admin/elective/'
  private fetch_it_courses_url = this.ELECTIVE_URL + "fetch_it_courses";
  private fetch_ece_courses_url = this.ELECTIVE_URL + "fetch_ece_courses";

  private fetch_faculty_preferences_it_url = this.ELECTIVE_URL + "fetch_faculty_preferences_it";
  private fetch_faculty_preferences_ece_url = this.ELECTIVE_URL + "fetch_faculty_preferences_ece";

  private fetch_course_faculty_it_url = this.ELECTIVE_URL + "fetch_course_faculty_it";
  private fetch_course_faculty_ece_url = this.ELECTIVE_URL + "fetch_course_faculty_ece";

  private fetch_it_student_preferences_url = this.ELECTIVE_URL + "fetch_it_student_preferences";
  private fetch_ece_student_preferences_url = this.ELECTIVE_URL + "fetch_ece_student_preferences";

  private fetch_it_course_students_url = this.ELECTIVE_URL + "fetch_it_course_students";
  private fetch_ece_course_students_url = this.ELECTIVE_URL + "fetch_ece_course_students";

  private fetch_it_faculty_courses_url = this.ELECTIVE_URL + "fetch_it_faculty_courses";
  private fetch_ece_faculty_courses_url = this.ELECTIVE_URL + "fetch_ece_faculty_courses";

  private CORE_URL = 'http://localhost:3001/admin/core/';

  private set_sem_type_url = this.CORE_URL + "set_sem_type";
  private get_sem_type_url = this.CORE_URL + "get_sem_type";

  private fetch_core_course_faculty_it_url = this.CORE_URL + "fetch_course_faculty_it";
  private fetch_core_course_faculty_ece_url = this.CORE_URL + "fetch_course_faculty_ece";

  private fetch_core_faculty_preferences_it_url = this.CORE_URL + "fetch_faculty_preferences_it";
  private fetch_core_faculty_preferences_ece_url = this.CORE_URL + "fetch_faculty_preferences_ece";

  private fetch_it_faculty_courses_core_url = this.CORE_URL + "fetch_it_faculty_courses";
  private fetch_ece_faculty_courses_core_url = this.CORE_URL + "fetch_ece_faculty_courses";

  private PROJECT_URL = 'http://localhost:3001/admin/project/';

  private get_all_project_detail_url = this.PROJECT_URL + "get_all_project_detail";
  private delete_project_url = this.PROJECT_URL + "delete_project";

  public it_baskets!: any;
  public ece_baskets!: any;

  constructor(private http: HttpClient) { }

  fetch_baskets() {
    this.fetch_it_baskets().subscribe(
      res => {
        this.it_baskets = res,
          console.log(this.it_baskets)
      },
      err => console.log(err)
    )

    this.fetch_ece_baskets().subscribe(
      res => this.ece_baskets = res,
      err => console.log(err)
    )
  }

  fetch_it_faculties() {
    return this.http.get<any>(this.fetch_it_faculties_url);
  }

  fetch_ece_faculties() {
    return this.http.get<any>(this.fetch_ece_faculties_url);
  }

  fetch_it_baskets() {
    return this.http.get<any>(this.fetch_it_baskets_url);
  }

  fetch_ece_baskets() {
    return this.http.get<any>(this.fetch_ece_baskets_url);
  }

  create_basket(stream: string, basket_id: string, basket_name: string, faculty_id: string) {
    let payload = { stream: stream, basket_id: basket_id, basket_name: basket_name, faculty_id: faculty_id };
    console.log("payload", payload);
    return this.http.post<any>(this.create_basket_url, payload);
  }

  add_course(basket_id: string, course_id: string, course_name: string) {
    let payload = { basket_id: basket_id, course_id: course_id, course_name: course_name };
    return this.http.post<any>(this.add_course_url, payload);
  }

  delete_course(basket_id: string, course_id: string) {
    let params = new HttpParams()
      .set('basket_id', basket_id)
      .set('course_id', course_id);
    return this.http.delete<any>(this.delete_course_url, { params });
  }

  delete_basket(basket_id: string) {
    let params = new HttpParams()
      .set('basket_id', basket_id);
    return this.http.delete<any>(this.delete_basket_url, { params });
  }


  /**
   * Running courses.
   */
  fetch_it_courses() {
    return this.http.get<any>(this.fetch_it_courses_url);
  }

  fetch_ece_courses() {
    return this.http.get<any>(this.fetch_ece_courses_url);
  }

  /**
   * Faculties preferences.
   */
  fetch_faculty_preferences_it() {
    return this.http.get<any>(this.fetch_faculty_preferences_it_url);
  }

  fetch_faculty_preferences_ece() {
    return this.http.get<any>(this.fetch_faculty_preferences_ece_url);
  }

  /**
   * Courses Faculty
   */
  fetch_course_faculty_it() {
    return this.http.get<any>(this.fetch_course_faculty_it_url);
  }

  fetch_course_faculty_ece() {
    return this.http.get<any>(this.fetch_course_faculty_ece_url);
  }

  /**
   * Student preferences.
   */
  fetch_it_student_preferences() {
    return this.http.get<any>(this.fetch_it_student_preferences_url);
  }

  fetch_ece_student_preferences() {
    return this.http.get<any>(this.fetch_ece_student_preferences_url);
  }

  /**
   * Course students.
   */
  fetch_it_course_students() {
    return this.http.get<any>(this.fetch_it_course_students_url);
  }

  fetch_ece_course_students() {
    return this.http.get<any>(this.fetch_ece_course_students_url);
  }

  /**
   * Faculty Loadchart
   */
  fetch_it_faculty_courses() {
    return this.http.get<any>(this.fetch_it_faculty_courses_url);
  }

  fetch_ece_faculty_courses() {
    return this.http.get<any>(this.fetch_ece_faculty_courses_url);
  }

  /**
   * Core.
   */
  set_sem_type(semType: string) {
    return this.http.put<any>(this.set_sem_type_url, { sem_type: semType });
  }

  get_sem_type() {
    return this.http.get<any>(this.get_sem_type_url);
  }


  fetch_core_course_faculty_it() {
    return this.http.get<any>(this.fetch_core_course_faculty_it_url);
  }

  fetch_core_course_faculty_ece() {
    return this.http.get<any>(this.fetch_core_course_faculty_ece_url);
  }


  fetch_core_faculty_preferences_it() {
    return this.http.get<any>(this.fetch_core_faculty_preferences_it_url);
  }

  fetch_core_faculty_preferences_ece() {
    return this.http.get<any>(this.fetch_core_faculty_preferences_ece_url);
  }

  fetch_it_faculty_courses_core() {
    return this.http.get<any>(this.fetch_it_faculty_courses_core_url);
  }

  fetch_ece_faculty_courses_core() {
    return this.http.get<any>(this.fetch_ece_faculty_courses_core_url);
  }

  /**
   * Projects.
   */
   get_all_project_detail() {
     return this.http.get<any>(this.get_all_project_detail_url);
   }

   delete_project(projectId: string) {
     let params = new HttpParams().set('project_id', projectId);
     return this.http.delete<any>(this.delete_project_url, {params});
   }
}
