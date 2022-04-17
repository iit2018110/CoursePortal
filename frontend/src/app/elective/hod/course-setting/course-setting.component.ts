import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-course-setting',
  templateUrl: './course-setting.component.html',
  styleUrls: ['./course-setting.component.css']
})
export class CourseSettingComponent implements OnInit {

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this._util.init();
  }

  dontRunCourse(basketId: string, courseId: string) {
    this._util.stop_course(basketId,courseId).subscribe(
      res=> this.ngOnInit(),
      err => console.log(err)
    )
  }

  runCourse(basketId: string, courseId: string) {
    this._util.run_course(basketId,courseId).subscribe(
      res=> this.ngOnInit(),
      err => console.log(err)
    )
  }
}
