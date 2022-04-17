import { Component, OnInit } from '@angular/core';
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

  }
}
