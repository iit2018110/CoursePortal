import { Component, OnInit } from '@angular/core';
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

  acceptCourse(courseId: string) {
    this._util.accept_course(courseId).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  rejectCourse(courseId: string) {
    this._util.reject_course(courseId).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  restoreCourse(courseId: string) {
    this._util.restore_course(courseId).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  submitCourses() {
    this._util.submit_courses().subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }
}
