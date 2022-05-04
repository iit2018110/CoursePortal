import { BasketComponent } from './../basket/basket.component';
import { OpenDialogService } from './../../open-dialog.service';
import { AfterContentInit, Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilService } from '../util.service';
import { ProfileComponent } from '../profile/profile.component';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { CoreCourseFacultyOption, CourseFacultyOption, StudentOption } from 'src/app/csv_options/options';
import { PortalSettingService } from '../portal-setting.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public semType!: string;
  public electives:boolean=true;
  public it:boolean =false;
  public ece:boolean = false;
  public projects:boolean=false;
  public core:boolean=false;
  public resetPortal:boolean=false;
  public oddButton:boolean=true;
  public it_faculties!: any;
  public ece_faculties!: any;

  public it_courses!: any;
  public ece_courses!: any;//basketsmanagemnet

  public faculties_it: any;
  public faculties_ece: any;//running courses

  public baskets_it: any;//faculty oreferences
  public baskets_ece: any;

  public it_students!: any;
  public ece_students!: any;//    facukty in courses

  public it_baskets!: any;
  public ece_baskets!: any;

  public faculties_it2!: any;
  public faculties_ece2!: any;

  public faculties:any;

  public core_faculties_it: any;
  public core_faculties_ece: any;

  public core_baskets_it: any;
  public core_baskets_ece: any;

  public core_loadchart_it: any;
  public core_loadchart_ece: any;

  public basketsManagement:boolean = false
  public runningCourse:boolean = false;
  public facultypreferences:boolean = false;
  public facultycourses:boolean = false;
  public studentpreferences:boolean = false;
  public studentscourses:boolean = false;
  public facultyloadchart:boolean = false;

  public projectmanagment:boolean = false;

  public corefacultypreferences:boolean = false;
  public corefacultycourses:boolean = false;
  public corefacultyloadchart:boolean = false;

  public resetPortalElective:boolean = false;
  public resetPortalCore:boolean = false;
  public resetPortalProject:boolean = false;

  constructor(public _auth: AuthService,
    public openDialog: OpenDialogService,
     public _util: UtilService,
     public _portal: PortalSettingService
     ) {

  }

  ngOnInit(): void {
    this.getSemType();
    this._auth.decodeJWT();
    this._util.fetch_baskets();
    this.fetchFaculties();
    this.init();
  }
  basketsManagemement(){
    this.basketsManagement = true;
    this.ece = false;
    this.it = true;
    this.runningCourse = false;
    this.facultypreferences = false;
    this.facultycourses = false;
    this.studentpreferences = false;
    this.studentscourses = false;
    this.facultyloadchart = false;
  }
  runningCourses(){
    this.runningCourse = true;
    this.ece = false;
    this.it = true;
    this.facultypreferences = false;
    this.basketsManagement = false;
    this.facultycourses = false;
    this.studentpreferences = false;
    this.studentscourses = false;
    this.facultyloadchart = false;
  }
  facultyPreferences() {
    this.facultypreferences = true;
    this.ece = false;
    this.it = true;
    this.runningCourse = false;
    this.basketsManagement = false;
    this.facultycourses = false;
    this.studentpreferences = false;
    this.studentscourses = false;
    this.facultyloadchart = false;
  }
  facultyCourses(){
    this.facultycourses = true;
    this.ece = false;
    this.it = true;
    this.runningCourse = false;
    this.basketsManagement = false;
    this.facultypreferences = false;
    this.studentpreferences = false;
    this.studentscourses = false;
    this.facultyloadchart = false;
  }
  studentPreferences(){
    this.studentpreferences = true;
    this.ece = false;
    this.it = true;
    this.runningCourse = false;
    this.basketsManagement = false;
    this.facultypreferences = false;
    this.facultycourses = false;
    this.studentscourses = false;
    this.facultyloadchart = false;
  }
  studentsCourses(){
    this.studentscourses = true;
    this.ece = false;
    this.it = true;
    this.runningCourse = false;
    this.basketsManagement = false;
    this.facultypreferences = false;
    this.facultycourses = false;
    this.studentpreferences = false;
    this.facultyloadchart = false;
  }
  facultyLoadchart(){
    this.facultyloadchart = true;
    this.ece = false;
    this.it = true;
    this.runningCourse = false;
    this.basketsManagement = false;
    this.facultypreferences = false;
    this.facultycourses = false;
    this.studentpreferences = false;
    this.studentscourses = false;
  }
  projectManagment(){
    this.projectmanagment = true;
  }
  coreFacultyPreferences(){
    this.corefacultypreferences = true;
    this.ece = false;
    this.it = true;
    this.corefacultycourses = false;
    this.corefacultyloadchart = false;
  }
  coreFacultyCourses(){
    this.corefacultycourses = true;
    this.ece = false;
    this.it = true;
    this.corefacultypreferences = false;
    this.corefacultyloadchart = false;
  }
  coreFacultyLoadchart(){
    this.corefacultyloadchart = true;
    this.ece = false;
    this.it = true;
    this.corefacultypreferences = false;
    this.corefacultycourses = false;
  }


  resetProjectPortal(){
    this._portal.reset_project().subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }
  resetElectivePortal(){
    this._portal.reset_elective().subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }
  resetCorePortal(){
    this._portal.reset_core().subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  init() {
    this._util.fetch_it_courses().subscribe(
      res => this.it_courses = res,
      err => console.log(err)
    )

    this._util.fetch_ece_courses().subscribe(
      res => this.ece_courses = res,
      err => console.log(err)
    )
    this._util.fetch_faculty_preferences_it().subscribe(
      res => this.faculties_it = res,
      err => console.log(err)
    )

    this._util.fetch_faculty_preferences_ece().subscribe(
      res => this.faculties_ece = res,
      err => console.log(err)
    )
    this._util.fetch_course_faculty_it().subscribe(
      res => this.baskets_it = res,
      err => console.log(err)
    )

    this._util.fetch_course_faculty_ece().subscribe(
      res => this.baskets_ece = res,
      err => console.log(err)
    )
    this._util.fetch_it_student_preferences().subscribe(
      res => this.it_students = res,
      err => console.log(err)
    )

    this._util.fetch_ece_student_preferences().subscribe(
      res => this.ece_students = res,
      err => console.log(err)
    )
    this._util.fetch_it_course_students().subscribe(
      res => this.it_baskets = res,
      err => console.log(err)
    )

    this._util.fetch_ece_course_students().subscribe(
      res => this.ece_baskets = res,
      err => console.log(err)
    )
    this._util.fetch_it_faculty_courses().subscribe(
      res => this.faculties_it2 = res,
      err => console.log(err)
    )

    this._util.fetch_ece_faculty_courses().subscribe(
      res => this.faculties_ece2 = res,
      err => console.log(err)
    )

    this._util.get_all_project_detail().subscribe(
      res => this.faculties = res,
      err => console.log(err)
    )
    this._util.fetch_core_faculty_preferences_it().subscribe(
      res => this.core_faculties_it = res,
      err => console.log(err)
    )

    this._util.fetch_core_faculty_preferences_ece().subscribe(
      res => this.core_faculties_ece = res,
      err => console.log(err)
    )
    this._util.fetch_core_course_faculty_it().subscribe(
      res => this.core_baskets_it = res,
      err => console.log(err)
    )

    this._util.fetch_core_course_faculty_ece().subscribe(
      res => this.core_baskets_ece = res,
      err => console.log(err)
    )
    this._util.fetch_it_faculty_courses_core().subscribe(
      res => this.core_loadchart_it = res,
      err => console.log(err)
    )

    this._util.fetch_ece_faculty_courses_core().subscribe(
      res => this.core_loadchart_ece = res,
      err => console.log(err)
    )
  }


  onProfileClick(){
    this.openDialog.openDialog(ProfileComponent);
  }

  setSemType(semType: string,event:any) {
    this.oddButton = !this.oddButton;
    this._util.set_sem_type(semType).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }
  deleteProject(projectId: string) {
    this._util.delete_project(projectId).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  getSemType() {
    this._util.get_sem_type().subscribe(
      (res) => {
        console.log(res, "Ji")
        this.semType = res
        if(res == 'odd') {
          this.oddButton = true;
        } else {
          this.oddButton = false;
        }
      },
      err => console.log(err)
    )
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
  ITClicked(event:any){
    var element = document.getElementsByClassName("active")[1];
    element.classList?.remove("active");
    event.target.classList.add("active");
    console.log(event.target.name)
    this.it = false
    this.ece = false
    switch(event.target.name) {
      case "IT":
        this.it = true
        break;
      case "ECE":
        this.ece = true
        break;

    }
  }
  dashboardNavClicked(event:any){
    var element = document.getElementsByClassName("active")[0];
    element.classList?.remove("active");
    event.target.classList.add("active");
    console.log(event.target.name)
    this.electives = false
    this.projects = false
    this.core = false
    this.resetPortal = false
    switch(event.target.name) {
      case "Electives":
        this.electives = true
        break;
      case "Projects":
        this.projects = true

        break;
      case "Core":
        this.core = true
        break;

      case "ResetPortal":
        this.resetPortal = true
        break;
    }
    this.runningCourse = false;
    this.basketsManagement = false;
    this.facultypreferences = false;
    this.facultycourses = false;
    this.studentpreferences = false;
    this.studentscourses = false;
    this.facultyloadchart = false;

    this.projectmanagment = false;

    this.corefacultypreferences = false;
    this.corefacultycourses = false;
    this.corefacultyloadchart = false;

    this.resetPortalElective = false;
    this.resetPortalProject = false;
    this.resetPortalCore = false;

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
    console.log("Delete ")
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

  downloadCSVCourseFaculty(baskets: any) {
    let data = [];
    for (let i = 0; i < baskets.length; i++) {
      let basket = baskets[i];
      for (let j = 0; j < basket.courses.length; j++) {
        let course = basket.courses[j];
        data.push({ courseId: course.id, courseName: course.name, seats: course.seats, facultyName: course.faculty.name });
      }
    }
    new AngularCsv(data, "Course details", CourseFacultyOption);
  }

  downloadCSVCourseStudent(studentList: any, courseName: string) {
    new AngularCsv(studentList, courseName , StudentOption);
  }

  downloadCSVCoreCourseFaculty(baskets: any) {
    let data = [];
    for (let i = 0; i < baskets.length; i++) {
      let basket = baskets[i];
      for (let j = 0; j < basket.courses.length; j++) {
        let course = basket.courses[j];
        data.push({courseId : course.id, courseName: course.name, facultyName: course.faculty.name});
      }
    }
    new AngularCsv(data, "Course details" , CoreCourseFacultyOption);
  }
}
