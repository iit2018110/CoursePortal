import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-faculty-loadchart',
  templateUrl: './faculty-loadchart.component.html',
  styleUrls: ['./faculty-loadchart.component.css']
})
export class FacultyLoadchartComponent implements OnInit {
  public faculties_it!: any;
  public faculties_ece!: any;

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this.getFacultiesLoadchart();
  }

  getFacultiesLoadchart() {
    this._util.fetch_it_faculty_courses().subscribe(
      res => this.faculties_it = res,
      err => console.log(err)
    )

    this._util.fetch_ece_faculty_courses().subscribe(
      res => this.faculties_ece = res,
      err => console.log(err)
    )
  }

}
