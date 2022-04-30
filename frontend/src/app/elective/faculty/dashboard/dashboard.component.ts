import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public isCC = false;
  public cc_functionality = false;
  public faculty_functionality = false;

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this.checkCC();
    this.check_cc_functionality();
    this.check_faculty_functionality();
  }

  checkCC() {
     let token_cc = localStorage.getItem('token_cc');
     if(token_cc) {
       this.isCC = true;
       this._util.cc_init();
     }
  }

  check_cc_functionality() {
    this._auth.get_cc_portal_timing().subscribe(
      res => {
        if(!res) {
          this.cc_functionality = true;
          return;
        }
        let currTime = new Date().toLocaleString();
        let startTime = new Date(res.start_time).toLocaleString();
        let endTime = new Date(res.end_time).toLocaleString();

        if (currTime >= startTime && currTime <= endTime) {
          this.cc_functionality = true;
        }
      },
      err => console.log(err)
    )
  }

  check_faculty_functionality() {
    this._auth.get_portal_timing().subscribe(
      res => {
        if(!res) {
          this.faculty_functionality = true;
          return;
        }
        let currTime = new Date().toLocaleString();
        let startTime = new Date(res.start_time).toLocaleString();
        let endTime = new Date(res.end_time).toLocaleString();

        if (currTime >= startTime && currTime <= endTime) {
          this.faculty_functionality = true;
        }
      },
      err => console.log(err)
    )
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
