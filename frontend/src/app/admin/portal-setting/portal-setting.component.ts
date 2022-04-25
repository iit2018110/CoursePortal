import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PortalSettingService } from '../portal-setting.service';

@Component({
  selector: 'app-portal-setting',
  templateUrl: './portal-setting.component.html',
  styleUrls: ['./portal-setting.component.css']
})
export class PortalSettingComponent implements OnInit {
  elective_cc_start = 0;
  elective_cc_end = 0;
  elective_hod_start = 0;
  elective_hod_end = 0;
  elective_faculty_start = 0;
  elective_faculty_end = 0;
  elective_student_start = 0;
  elective_student_end = 0;

  core_hod_start = 0;
  core_hod_end = 0;
  core_faculty_start = 0;
  core_faculty_end = 0;

  project_faculty_start = 0;
  project_faculty_end = 0;
  project_student_start = 0;
  project_student_end = 0;


  constructor(public _auth: AuthService, public _portalService: PortalSettingService) { }

  ngOnInit(): void {
    this.getPortalTiming();
  }

  getPortalTiming() {
    this._portalService.get_portal_timing().subscribe(
      res => {
        for(let i = 0; i < res.length; i++) {
          if(res[i].user_type==='elective_cc') {
            this.elective_cc_start = res[i].start_time;
            this.elective_cc_end = res[i].end_time;
          } else if(res[i].user_type==='elective_hod') {
            this.elective_hod_start = res[i].start_time;
            this.elective_hod_end = res[i].end_time;
          } else if(res[i].user_type==='elective_faculty') {
            this.elective_faculty_start = res[i].start_time;
            this.elective_faculty_end = res[i].end_time;
          } else if(res[i].user_type==='elective_student') {
            this.elective_student_start = res[i].start_time;
            this.elective_student_end = res[i].end_time;
          } else if(res[i].user_type==='project_student') {
            this.project_student_start = res[i].start_time;
            this.project_student_end = res[i].end_time;
          } else if(res[i].user_type==='project_faculty') {
            this.project_faculty_start = res[i].start_time;
            this.project_faculty_end = res[i].end_time;
          } else if(res[i].user_type==='core_hod') {
            this.core_hod_start = res[i].start_time;
            this.core_hod_end = res[i].end_time;
          } else if(res[i].user_type==='core_faculty') {
            this.core_faculty_start = res[i].start_time;
            this.core_faculty_end = res[i].end_time;
          }
        }
      },
      err => console.log(err)
    )
  }

  setPortalTiming(userType: string, startTime: string, endTime: string) {
    this._portalService.set_portal_timing(userType,startTime,endTime).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }
}
