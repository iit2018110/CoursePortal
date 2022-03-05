import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCoordinatorComponent } from './course-coordinator.component';

describe('CourseCoordinatorComponent', () => {
  let component: CourseCoordinatorComponent;
  let fixture: ComponentFixture<CourseCoordinatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCoordinatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
