import { Component, OnInit } from '@angular/core';
import { IProjectPost } from 'src/app/models/project_post';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public faculties!: any;
  public projects!: any;
  public canChangeStatus = true;
  public approved = false;

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this.canChangeStatus = true;
    this._util.init();
    this.getFacultyList();
    this.getProjectsList();
  }

  checkApproved() {
    for (let i = 0; i < this.projects.length; i++) {
      let project = this.projects[i];
      if(project.project_status === 'approved') {
        this.approved = true;
        break;
      }
    }
  }
  checkChangeStatus() {
    for (let i = 0; i < this.projects.length; i++) {
      let project = this.projects[i];

      for (let j = 0; j < project.students.length; j++) {
        let student = project.students[j];
        if(student.student_id === this._auth.id && student.student_status === 'approved') {
          this.canChangeStatus = false;
          return;
        }
      }
    }
  }

  getFacultyList() {
    this._util.get_faculty_list().subscribe(
      res => this.faculties = res,
      err => console.log(err)
    )
  }

  getProjectsList() {
    this._util.get_detail_project().subscribe(
      res => {
        this.projects = res,
        this.checkChangeStatus(),
        this.checkApproved()
      },
      err => console.log()
    )
  }

  changeStatus(projectId: string, status: string) {
    this._util.post_status_by_student(projectId, status).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  createProject(data: any) {
    let detail: IProjectPost = {
      title: data['project_title'], faculty_id: data['faculty_id'],
      student_posted_id: this._auth.id, students: []
    };

    if(data['member2']) {
      detail.students.push({student_id: data.member2})
    }
    if(data['member3']) {
      detail.students.push({student_id: data.member3})
    }
    if(data['member4']) {
      detail.students.push({student_id: data.member4})
    }
    if(data['member5']) {
      detail.students.push({student_id: data.member5})
    }
    if(data['member6']) {
      detail.students.push({student_id: data.member6})
    }

    this._util.post_project_by_student(detail).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }
}
