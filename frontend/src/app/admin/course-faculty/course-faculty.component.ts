import { Component, OnInit } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { CourseFacultyOption } from 'src/app/csv_options/options';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-course-faculty',
  templateUrl: './course-faculty.component.html',
  styleUrls: ['./course-faculty.component.css']
})
export class CourseFacultyComponent implements OnInit {
  public baskets_it: any;
  public baskets_ece: any;

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this._util.fetch_course_faculty_it().subscribe(
      res => this.baskets_it = res,
      err => console.log(err)
    )

    this._util.fetch_course_faculty_ece().subscribe(
      res => this.baskets_ece = res,
      err => console.log(err)
    )
  }

  downloadCSV(baskets: any) {
    let data = [];
    for (let i = 0; i < baskets.length; i++) {
      let basket = baskets[i];
      for (let j = 0; j < basket.courses.length; j++) {
        let course = basket.courses[j];
        data.push({ courseId: course.id, courseName: course.name, seats: course.seats, facultyName: course.faculty.name });
      }
    }
    new AngularCsv(data, "Course details", CourseFacultyOption);
  }
}

