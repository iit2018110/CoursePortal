import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  assigned_basket_courses = [{id: 'ML', 
                              name: 'Machine Learning', 
                              courses: [{id: 'DL', name: 'Deep Learning', faculty: {id: 'PC', name: 'Pawan Chakorwarti'}},
                                        {id: 'PR', name: 'Pattern Recognition', faculty: {id: 'SRD', name: 'Sri Ram Dubey'}},
                                        {id: 'NN', name: 'Neural Network', faculty: {id: 'GCN', name: 'G.C.Nandi'}},
                                        {id: 'IR', name: 'Information Retrieval', faculty: {id: 'SRD', name: 'Sri Ram Dubey'}}
                                      ]},
                              {id: 'IS', 
                              name: 'Information Security', 
                              courses: [{id: 'CR', name: 'Cryptography', faculty: {id:'VKC', name: 'V.K.Chourassia'}},
                                        {id: 'BL', name: 'Blockchain', faculty: {id:'VK', name: 'Venkatesan'}},
                                        {id: 'DS', name: 'Database Security', faculty: {id:'VKC', name: 'V.K.Chourassia'}}
                                ]}                                             
                            ];

  constructor() { }

  ngOnInit(): void {
  }

}
