import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBasket } from '../models/basket';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private BASKET_URL = "http://localhost:3001/admin/elective/basket/";

  private fetch_it_baskets_url = this.BASKET_URL + "fetch_it_baskets";
  private fetch_ece_baskets_url = this.BASKET_URL + "fetch_ece_baskets";
  private create_basket_url = this.BASKET_URL + "create_basket";
  private add_course_url = this.BASKET_URL + "add_course";
  private delete_course_url = this.BASKET_URL + "delete_course";
  private delete_basket_url = this.BASKET_URL + "delete_basket";

  public it_baskets!: IBasket[];
  public ece_baskets!: IBasket[];

  constructor(private http: HttpClient) { }

  fetch_baskets() {
    this.fetch_it_baskets().subscribe(
      res => {
        this.it_baskets = res,
        console.log(this.it_baskets)
      },
      err => console.log(err)
    )

    this.fetch_ece_baskets().subscribe(
      res => this.ece_baskets = res,
      err => console.log(err)
    ) 
  }

  fetch_it_baskets() {
    return this.http.get<IBasket[]>(this.fetch_it_baskets_url);
  }

  fetch_ece_baskets() {
    return this.http.get<IBasket[]>(this.fetch_ece_baskets_url);
  }

  create_basket(stream: string, basket_id: string, basket_name: string) {
    let payload = {stream: stream, basket_id: basket_id, basket_name: basket_name};
    console.log("payload", payload);
    return this.http.post<any>(this.create_basket_url, payload);
  }

  add_course(basket_id: string, course_id: string, course_name: string) {
    let payload = {basket_id: basket_id, course_id: course_id, course_name: course_name};
    return this.http.post<any>(this.add_course_url, payload);
  }

  delete_course(basket_id: string, course_id: string) {
    let params = new HttpParams()
                  .set('basket_id',basket_id)
                  .set('course_id',course_id);
    return this.http.delete<any>(this.delete_course_url, {params});
  }

  delete_basket(basket_id: string) {
    let params = new HttpParams()
                  .set('basket_id',basket_id);
    return this.http.delete<any>(this.delete_basket_url, {params});
  }


}
