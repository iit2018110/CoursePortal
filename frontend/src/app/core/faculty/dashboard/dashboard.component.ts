import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public _auth: AuthService, public _util: UtilService) { }

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
