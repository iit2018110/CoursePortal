import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-portal-status',
  templateUrl: './portal-status.component.html',
  styleUrls: ['./portal-status.component.css']
})
export class PortalStatusComponent implements OnInit {

  public userType!: string;
  public currTime!: any;
  public startTime!: any;
  public endTime!: any;

  constructor(private actroute: ActivatedRoute, private _util: UtilService, private router: Router) { }



  ngOnInit(): void {
    this.actroute.data.subscribe(
      data => {
        this.userType = data['user_type'];
      }
    )

    this.getPortalTiming();
  }

  getPortalTiming() {
    this._util.get_portal_timing(this.userType).subscribe(
      res => {
        this.currTime = new Date().getTime();
        this.startTime = new Date(res.start_time).getTime();
        this.endTime = new Date(res.end_time).getTime();
      },
      err => console.log(err)
    )
  }

  logout() {
    if(this.userType==='elective_cc') {
      localStorage.removeItem('token_cc')
      localStorage.removeItem('token_faculty');
    }
    else if(this.userType==='elective_hod') {
      localStorage.removeItem('token_hod')
    }
    else if(this.userType==='elective_faculty') {
      localStorage.removeItem('token_cc')
      localStorage.removeItem('token_faculty');
    }
    else if(this.userType==='elective_student') {
      localStorage.removeItem('token_student')
    }

    else if(this.userType==='project_student') {
      localStorage.removeItem('token_student')
    }
    else if(this.userType==='project_faculty') {
      localStorage.removeItem('token_cc')
      localStorage.removeItem('token_faculty');
    }
    else if(this.userType==='core_hod') {
      localStorage.removeItem('token_hod')
    }
    else if(this.userType==='core_faculty') {
      localStorage.removeItem('token_cc')
      localStorage.removeItem('token_faculty');
    }

    this.router.navigate(['']);
  }




  /* if(res[i].user_type==='elective_cc') {
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
          } */
}
