import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-course-faculty-core',
  templateUrl: './course-faculty-core.component.html',
  styleUrls: ['./course-faculty-core.component.css']
})
export class CourseFacultyCoreComponent implements OnInit {
  public baskets_it: any;
  public baskets_ece: any;

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this._util.fetch_core_course_faculty_it().subscribe(
      res => this.baskets_it = res,
      err => console.log(err)
    )

    this._util.fetch_core_course_faculty_ece().subscribe(
      res => this.baskets_ece = res,
      err => console.log(err)
    )
  }

}
