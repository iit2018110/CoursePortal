import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public courses_alloted!: any;

  allotedcourses: boolean = true;
  choosepreferences:boolean = false;
  preferences:boolean = false;

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this._util.init();
    this.getAllotedCourses();
  }

  getAllotedCourses() {
    this._util.get_alloted_courses().subscribe(
      res => this.courses_alloted = res,
      err => console.log(err)
    )
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

}
