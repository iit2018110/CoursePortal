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

  opted =true
  notopted = false
  alloted = false
  preferences = false
  ngOnInit(): void {
    this._util.init();
  }

  onCreate(basketId: string, p1_id:string, p1_name: string, p2_id:string, p2_name: string, p3_id: string, p3_name: string, p4_id:string, p4_name: string, p5_id:string, p5_name: string) {
    this._util.choose_preferences(basketId,p1_id,p1_name,p2_id,p2_name,p3_id,p3_name,p4_id,p4_name,p5_id,p5_name)
    .subscribe(
      res => {
        this.ngOnInit()

      },
      err => console.log(err)
    )
  }

  onDelete(basketId: string) {
    this._util.remove_preferences(basketId).subscribe(
      res => {
        this.ngOnInit()
      },
      err => console.log(err)
    )
  }

  onSubmit() {
    this._util.submit_preferences().subscribe(
      res => {
        this.opted = false
        this.notopted = false
        this.preferences = true
        this.ngOnInit()
      },
      err => console.log(err)
    )

  }

  onReset() {
    this._util.reset_preferences().subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }
  ITClicked(event:any){
    var element = document.getElementsByClassName("active")[0];
    element.classList?.remove("active");
    event.target.classList.add("active");
    console.log(event.target.name)
    this.opted = false
    this.notopted = false
    this.alloted = false
    this.preferences = false
    switch(event.target.name) {
      case "opted":
        this.opted = true
        break;
      case "notopted":
        this.notopted = true
        break;
      case "alloted":
        this.alloted = true
        break;
      case "preferences":
        this.preferences = true;
        break;
    }
  }
}
