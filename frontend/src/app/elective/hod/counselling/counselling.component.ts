import { Component, OnInit } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { StudentOption } from 'src/app/csv_options/options';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-counselling',
  templateUrl: './counselling.component.html',
  styleUrls: ['./counselling.component.css']
})
export class CounsellingComponent implements OnInit {

  isEmpty(obj: any) {
    return JSON.stringify(obj) === '{}';
  }

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this._util.init();
  }

  startCounselling() {
    this._util.students_counselling().subscribe(
      res => {
        this._util.course_students = res;
      },
      err => console.log(err)
    )
  }

  onSubmit() {
    this._util.submit_students_couselling().subscribe(
      res => {
        this.ngOnInit(),
        window.location.reload();
      },
      err => console.log(err)
    )
  }

  onReset(){
    this._util.reset_course_students().subscribe(
      res => {
        this.ngOnInit();
      },
      err => console.log(err)
    )
  }

  downloadCSV(studentList: any, courseName: string) {
    new AngularCsv(studentList, courseName , StudentOption);
  }
}
