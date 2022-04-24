import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-student-preferences',
  templateUrl: './student-preferences.component.html',
  styleUrls: ['./student-preferences.component.css']
})
export class StudentPreferencesComponent implements OnInit {

  public it_students!: any;
  public ece_students!: any;

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this._util.fetch_it_student_preferences().subscribe(
      res => this.it_students = res,
      err => console.log(err)
    )

    this._util.fetch_ece_student_preferences().subscribe(
      res => this.ece_students = res,
      err => console.log(err)
    )
  }

}
