import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-faculty-assign',
  templateUrl: './faculty-assign.component.html',
  styleUrls: ['./faculty-assign.component.css']
})
export class FacultyAssignComponent implements OnInit {
  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this._util.init();
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

  onCourseFacultyReset(){
    this._util.reset_assigned_courses().subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }
}

