import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public semType!: string;

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this.getSemType();
  }

  setSemType(semType: string) {
    this._util.set_sem_type(semType).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  getSemType() {
    this._util.get_sem_type().subscribe(
      res => this.semType = res,
      err => console.log(err)
    )
  }
}
