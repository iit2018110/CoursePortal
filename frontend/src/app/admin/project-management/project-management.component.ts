import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {
  public faculties!: any;

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this.getAllProjectDetail();
  }

  getAllProjectDetail() {
    this._util.get_all_project_detail().subscribe(
      res => this.faculties = res,
      err => console.log(err)
    )
  }

  deleteProject(projectId: string) {
    this._util.delete_project(projectId).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }
}
