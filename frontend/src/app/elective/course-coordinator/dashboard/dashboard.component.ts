import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public status!: string;

  public buffer_courses = [
                    {id: "PR", name: "Pattern Recognization", basket_id: "ML", status: "pending"},
                    {id: "CO", name: "Convex Optimization", basket_id: "ML",status: "pending"},
                    {id: "NN", name: "Neural Network", basket_id: "ML",status: "selected"},
                    {id: "DL", name: "Deep Learning", basket_id: "ML",status: "rejected"},
                   ];
  
  public running_courses = [
                            {id: "PR", name: "Pattern Recognization", basket_id: "ML"},
                            {id: "CO", name: "Convex Optimization", basket_id: "ML"},
                            {id: "NN", name: "Neural Network", basket_id: "ML"},
                            {id: "DL", name: "Deep Learning", basket_id: "ML"},
                          ];               

  constructor(public _util: UtilService, public _auth: AuthService) { }

  ngOnInit(): void {
    this._auth.fetchProfile();
    this._util.fetchDashboard();
    this.status = "buffer"; //running or buffer
  }


}
