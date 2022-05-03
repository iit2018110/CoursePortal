import { Component, OnInit } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { StudentOption } from 'src/app/csv_options/options';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-course-students',
  templateUrl: './course-students.component.html',
  styleUrls: ['./course-students.component.css']
})
export class CourseStudentsComponent implements OnInit {

  public it_baskets!: any;
  public ece_baskets!: any;

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this._util.fetch_it_course_students().subscribe(
      res => this.it_baskets = res,
      err => console.log(err)
    )

    this._util.fetch_ece_course_students().subscribe(
      res => this.ece_baskets = res,
      err => console.log(err)
    )
  }

  downloadCSV(studentList: any, courseName: string) {
    new AngularCsv(studentList, courseName , StudentOption);
  }
}
