import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public isCC = false;

  constructor(public _auth: AuthService) { }

  ngOnInit(): void {
    this.checkCC();
    this._auth.fetchProfile();
  }

  checkCC() {
    let token_cc = localStorage.getItem('token_cc');
    if (token_cc) {
      this.isCC = true;
    }
  }

}
