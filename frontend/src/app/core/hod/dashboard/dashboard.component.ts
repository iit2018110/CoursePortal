import { Component, OnInit } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { CoreCourseFacultyOption } from 'src/app/csv_options/options';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this._util.init();
  }

  getFaculties(courseId: string) {
    for(let i = 0; i < this._util.basket_faculties.length; i++) {
      if(this._util.basket_faculties[i].course_id === courseId) {
        return this._util.basket_faculties[i].faculties;
      }
    }

    return [];
  }

  onCreate(selectFaculty: any) {
    let courses = [];
    for(let i in selectFaculty) {
      courses.push({course_id: i, ...selectFaculty[i]})
    }
    console.log("courses: ", courses);

    this._util.assign_courses(courses).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  onReset(semester: any) {
    this._util.unassign_courses(semester).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  onSubmit() {
    this._util.submit_assigned_courses().subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  onCourseFacultyReset(){
    this._util.reset_assigned_courses().subscribe(
      res => {
        this.ngOnInit();
        window.location.reload();
      },
      err => console.log(err)
    )
  }

  downloadCSV(baskets: any) {
    let data = [];
    for (let i = 0; i < baskets.length; i++) {
      let basket = baskets[i];
      for (let j = 0; j < basket.courses.length; j++) {
        let course = basket.courses[j];
        data.push({courseId : course.id, courseName: course.name, facultyName: course.faculty.name});
      }
    }
    new AngularCsv(data, "Course details" , CoreCourseFacultyOption);
  }
}
