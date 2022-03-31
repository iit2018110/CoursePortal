import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-subject-preferences',
  templateUrl: './subject-preferences.component.html',
  styleUrls: ['./subject-preferences.component.css']
})
export class SubjectPreferencesComponent implements OnInit {

  constructor(public _util: UtilService) { }

  ngOnInit(): void {
    this._util.init();
  }

  onSubmit(data: JSON) {
    this._util.submit_preferences(data)
    .subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
    console.log(data);
  }
}
