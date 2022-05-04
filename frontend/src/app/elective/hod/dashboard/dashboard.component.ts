import { UtilService } from '../util.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { CourseFacultyOption, StudentOption } from 'src/app/csv_options/options';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public _auth: AuthService , public _util: UtilService,document:Document) { }
  facultyassign: boolean = true;
  counselling:boolean = false;
  coursesetting:boolean = false;

  assigned:boolean = true;
  unassigned:boolean = false;

  ngOnInit(): void {
    this._util.init();
  }
  btnClicked(btn:string){
    this.facultyassign = false;
    this.counselling = false;
    this.coursesetting  = false;

    switch(btn){
      case 'assign':
        this.facultyassign = true;
        break;

      case 'counsel':
        this.counselling = true;
        break;

      case 'course':
        this.coursesetting = true;
        break;
    }

  }
  menuClicked(event:any){
    var element = document.getElementsByClassName("active")[0];
    element.classList?.remove("active");
    event.target.classList.add("active");
    console.log(event.target.name)
    this.unassigned = false
    this.assigned = false
    switch(event.target.name) {
      case "assigned":
        this.assigned = true
        break;
      case "unassigned":
        this.unassigned = true
        break;

    }
  }

  getFaculties(courseId: string) {
    for(let i = 0; i < this._util.basket_faculties.length; i++) {
      if(this._util.basket_faculties[i].course_id === courseId) {
        return this._util.basket_faculties[i].faculties;
      }
    }

    return [];
  }

  onCreate(selectFaculty: any) {
    let courses = [];
    for(let i in selectFaculty) {
      courses.push({course_id: i, ...selectFaculty[i]})
    }
    console.log("courses: ", courses);

    this._util.assign_courses(courses).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  onReset(basketId: string) {
    this._util.unassign_courses(basketId).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  onSubmit() {
    this._util.submit_assigned_courses().subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  isEmpty(obj: any) {
    return JSON.stringify(obj) === '{}';
  }
  startCounselling() {
    this._util.students_counselling().subscribe(
      res => {
        this._util.course_students = res;
      },
      err => console.log(err)
    )
  }

  onSubmitCounselling() {
    this._util.submit_students_couselling().subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
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
  downloadCSV(baskets: any) {
    let data = [];
    for (let i = 0; i < baskets.length; i++) {
      let basket = baskets[i];
      for (let j = 0; j < basket.courses.length; j++) {
        let course = basket.courses[j];
        data.push({courseId : course.id, courseName: course.name, seats: course.seats, facultyName: course.faculty.name});
      }
    }
    new AngularCsv(data, "Course details" , CourseFacultyOption);
  }

  downloadStudentCSV(studentList: any, courseName: string) {
    new AngularCsv(studentList, courseName , StudentOption);
  }

  onCourseFacultyReset(){
    this._util.reset_assigned_courses().subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  onCounsellingReset(){
    this._util.reset_course_students().subscribe(
      res => {
        this.ngOnInit();
      },
      err => console.log(err)
    )
  }
}
