import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-faculty-loadchart-core',
  templateUrl: './faculty-loadchart-core.component.html',
  styleUrls: ['./faculty-loadchart-core.component.css']
})
export class FacultyLoadchartCoreComponent implements OnInit {
  public faculties_it!: any;
  public faculties_ece!: any;

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this.getFacultiesLoadchart();
  }

  getFacultiesLoadchart() {
    this._util.fetch_it_faculty_courses_core().subscribe(
      res => this.faculties_it = res,
      err => console.log(err)
    )

    this._util.fetch_ece_faculty_courses_core().subscribe(
      res => this.faculties_ece = res,
      err => console.log(err)
    )
  }

}
