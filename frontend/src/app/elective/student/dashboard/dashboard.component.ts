import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor( public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this._util.init();
  }

  onCreate(basketId: string, p1_id:string, p1_name: string, p2_id:string, p2_name: string, p3_id:string, p3_name: string) {
    this._util.choose_preferences(basketId,p1_id,p1_name,p2_id,p2_name,p3_id,p3_name)
    .subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  onDelete(basketId: string) {
    this._util.remove_preferences(basketId).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  onSubmit() {
    this._util.submit_preferences().subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

}
