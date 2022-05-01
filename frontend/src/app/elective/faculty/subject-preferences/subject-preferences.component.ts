import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-subject-preferences',
  templateUrl: './subject-preferences.component.html',
  styleUrls: ['./subject-preferences.component.css']
})
export class SubjectPreferencesComponent implements OnInit {
  public courses_alloted!: any;

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
