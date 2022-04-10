import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-faculty-assign',
  templateUrl: './faculty-assign.component.html',
  styleUrls: ['./faculty-assign.component.css']
})
export class FacultyAssignComponent implements OnInit {
  // assigned_basket_courses = [{id: 'ML',
  //                             name: 'Machine Learning',
  //                             courses: [{id: 'DL', name: 'Deep Learning', seats: 60, faculty: {id: 'PC', name: 'Pavan Chakorwarti'}},
  //                                       {id: 'PR', name: 'Pattern Recognition', seats: 80, faculty: {id: 'SRD', name: 'Sri Ram Dubey'}},
  //                                       {id: 'NN', name: 'Neural Network', seats: 70, faculty: {id: 'GCN', name: 'G.C.Nandi'}},
  //                                       {id: 'IR', name: 'Information Retrieval', seats: 60, faculty: {id: 'SRD', name: 'Sri Ram Dubey'}}
  //                                     ]},
  //                             {id: 'IS',
  //                             name: 'Information Security',
  //                             courses: [{id: 'CR', name: 'Cryptography', seats: 60, faculty: {id:'VKC', name: 'V.K.Chourassia'}},
  //                                       {id: 'BL', name: 'Blockchain', seats: 70, faculty: {id:'VK', name: 'Venkatesan'}},
  //                                       {id: 'DS', name: 'Database Security', seats: 70, faculty: {id:'VKC', name: 'V.K.Chourassia'}}
  //                               ]}
  //                         ];

  // unassigned_basket_courses = [{id: 'ML', name: 'Machine Learning', courses: [{id: 'DL', name: 'Deep Learning'},
  //                                                                             {id: 'PR', name: 'Pattern Recognition'},
  //                                                                             {id: 'NN', name: 'Neural Network'},
  //                                                                             {id: 'IR', name: 'Information Retrieval'}
  //                                                                           ]},
  //                               {id: 'IS', name: 'Information Security', courses: [{id: 'CR', name: 'Cryptography'},
  //                                                                           {id: 'BL', name: 'Blockchain'},
  //                                                                           {id: 'DS', name: 'Database Security'}
  //                                                                     ]}
  //                             ];

  // basket_faculties = [{id: 'ML', faculties: [{id: 'OPV', name: 'O.P.Viyas'},
  //                                            {id: 'PC', name: 'Pawan Chakorwarti'},
  //                                            {id: 'SRD', name: 'Sri Ram Dubey'},
  //                                            {id: 'SS', name: 'Satish Singh'},
  //                                            {id: 'GCN', name: 'G.C.Nandi'}
  //                                           ]},
  //                     {id: 'IS', faculties: [{id: 'VK', name: 'Venkatesan'},
  //                                            {id: 'RC', name: 'Rahul Chatopadhyay'},
  //                                            {id: 'PM', name: 'Pranav Mukherji'},
  //                                            {id: 'VKC', name: 'V.K.Chourassia'}
  //                                           ]}
  //                    ];

  constructor(public _util: UtilService) { }

  ngOnInit(): void {
    this._util.init();
  }

  getFaculties(courseId: string) {
    for(let i = 0; i < this._util.basket_faculties.length; i++) {
      if(this._util.basket_faculties[i].course_id === courseId) {
        return this._util.basket_faculties[i].faculties;
      }
    }

    return [];
  }

  onCreate(selectFaculty: any) {
    let courses = [];
    for(let i in selectFaculty) {
      courses.push({course_id: i, ...selectFaculty[i]})
    }
    console.log("courses: ", courses);

    this._util.assign_courses(courses).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  onReset(basketId: string) {
    this._util.unassign_courses(basketId).subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }

  onSubmit() {
    this._util.submit_assigned_courses().subscribe(
      res => this.ngOnInit(),
      err => console.log(err)
    )
  }
}
