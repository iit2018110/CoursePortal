import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private actroute: ActivatedRoute, private _util: UtilService) { }



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
        this.currTime = new Date().toLocaleString();
        this.startTime = new Date(res.start_time).toLocaleString();
        this.endTime = new Date(res.end_time).toLocaleString();
      },
      err => console.log(err)
    )
  }
}
