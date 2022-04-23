import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-running-courses',
  templateUrl: './running-courses.component.html',
  styleUrls: ['./running-courses.component.css']
})
export class RunningCoursesComponent implements OnInit {

  public it_courses!: any;
  public ece_courses!: any;

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this._util.fetch_it_courses().subscribe(
      res => this.it_courses = res,
      err => console.log(err)
    )

    this._util.fetch_ece_courses().subscribe(
      res => this.ece_courses = res,
      err => console.log(err)
    )
  }
}
