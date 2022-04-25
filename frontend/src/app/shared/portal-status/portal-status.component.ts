import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portal-status',
  templateUrl: './portal-status.component.html',
  styleUrls: ['./portal-status.component.css']
})
export class PortalStatusComponent implements OnInit {

  public currTime = 0;
  public startTime = 0;
  public endTime = 0;

  constructor(private actroute: ActivatedRoute) { }



  ngOnInit(): void {
    this.actroute.data.subscribe(
      data => {
        this.startTime = data['startTime'];
        this.endTime = data['endTime'];
      }
    )
  }

}
