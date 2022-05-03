import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

import { StudentOption } from 'src/app/csv_options/options'
@Component({
  selector: 'app-get-students',
  templateUrl: './get-students.component.html',
  styleUrls: ['./get-students.component.css']
})
export class GetStudentsComponent implements OnInit {

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this._util.init();
  }

  downloadCSV(studentList: any, courseName: string) {
    new AngularCsv(studentList, courseName , StudentOption);
  }
}
