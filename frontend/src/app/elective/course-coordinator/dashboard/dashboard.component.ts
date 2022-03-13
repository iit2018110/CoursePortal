import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // public status!: string;

  // public buffer_courses = [
  //                   {id: "PR", name: "Pattern Recognization", status: "pending"},
  //                   {id: "CO", name: "Convex Optimization",status: "pending"},
  //                   {id: "NN", name: "Neural Network",status: "selected"},
  //                   {id: "DL", name: "Deep Learning",status: "rejected"},
  //                  ];
  
  // public running_courses = [
  //                           {id: "PR", name: "Pattern Recognization"},
  //                           {id: "CO", name: "Convex Optimization"},
  //                           {id: "NN", name: "Neural Network"},
  //                           {id: "DL", name: "Deep Learning"},
  //                         ];               

  constructor(public _util: UtilService, public _auth: AuthService) { }

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
