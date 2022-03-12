import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBuffer_course } from 'src/app/models/buffer_course';
import { IRunning_course } from 'src/app/models/running_course';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public status!: string; //running or buffer
  public running_courses!: IRunning_course[];
  public buffer_courses!: IBuffer_course[];
  

  constructor(private _auth: AuthService, private http: HttpClient) { }

  fetchDashboard() {

  }
}
