import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public projects!: any;

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this._util.init();
    this.getProjectsList();
  }



  getProjectsList() {
    this._util.get_detail_project().subscribe(
      res => {
        this.projects = res
      },
      err => console.log()
    )
  }

  changeStatus(projectId: string, status: string) {
    this._util.post_status_by_faculty(projectId, status).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

}
