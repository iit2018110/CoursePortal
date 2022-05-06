import { Component, OnInit } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { StudentOption } from 'src/app/csv_options/options';
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


  subjectpreferences: boolean = true;
  studentsalloted:boolean = false;
  runningcourses:boolean = false;

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this._util.init()
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
        let currTime = new Date().getTime();
        let startTime = new Date(res.start_time).getTime();
        let endTime = new Date(res.end_time).getTime();

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

        let currTime = new Date().getTime();
        let startTime = new Date(res.start_time).getTime();
        let endTime = new Date(res.end_time).getTime();

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

  resetRunningCoursesCC() {
    this._util.reset_running_courses().subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  btnClicked(btn:string){
    this.subjectpreferences = false;
    this.studentsalloted = false;
    this.runningcourses  = false;

    switch(btn){
      case 'subjectpreferences':
        this.subjectpreferences = true;
        break;

      case 'studentsalloted':
        this.studentsalloted = true;
        break;

      case 'runningcourses':
        this.runningcourses = true;
        break;
    }

  }



  onSubmit(data: JSON) {
    this._util.submit_preferences(data)
    .subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
    console.log(data);
  }

  resetPreferences() {
    this._util.reset_preferences().subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  downloadCSVCourseStudent(studentList: any, courseName: string) {
    new AngularCsv(studentList, courseName , StudentOption);
  }
}
