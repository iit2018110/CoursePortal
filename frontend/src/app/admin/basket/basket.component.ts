import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  public it_faculties!: any;
  public ece_faculties!: any;

  constructor(public _auth: AuthService, public _util: UtilService) { }

  ngOnInit(): void {
    this._util.fetch_baskets();
    this.fetchFaculties();
  }

  fetchFaculties() {
    this._util.fetch_it_faculties().subscribe(
      res => this.it_faculties = res,
      err => console.log(err)
    )

    this._util.fetch_ece_faculties().subscribe(
      res => this.ece_faculties = res,
      err => console.log(err)
    )
  }

  addBasket(stream: string, basket_id: string, basket_name: string, faculty_id: string) {
    console.log('stream',stream);
    console.log('id',basket_id);
    console.log('name',basket_name);
    console.log('faculty_id', faculty_id);

    this._util.create_basket(stream,basket_id,basket_name,faculty_id).subscribe(
      res => this.ngOnInit(),
      err => alert(err.error)
    )
  }

  addCourse(basket_id: string, course_id: string, course_name: string) {
    this._util.add_course(basket_id,course_id,course_name).subscribe(
      res => this.ngOnInit(),
      err => alert(err.error)
    )
  }

  removeCourse(basket_id: string, course_id: string) {
    this._util.delete_course(basket_id,course_id).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  deleteBasket(basket_id: string) {
    this._util.delete_basket(basket_id).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

}
