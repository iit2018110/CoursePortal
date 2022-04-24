import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-faculty-preferences-core',
  templateUrl: './faculty-preferences-core.component.html',
  styleUrls: ['./faculty-preferences-core.component.css']
})
export class FacultyPreferencesCoreComponent implements OnInit {
  public faculties_it: any;
  public faculties_ece: any;

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this._util.fetch_core_faculty_preferences_it().subscribe(
      res => this.faculties_it = res,
      err => console.log(err)
    )

    this._util.fetch_core_faculty_preferences_ece().subscribe(
      res => this.faculties_ece = res,
      err => console.log(err)
    )
  }
}
