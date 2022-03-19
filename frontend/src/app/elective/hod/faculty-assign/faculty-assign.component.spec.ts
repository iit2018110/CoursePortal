import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyAssignComponent } from './faculty-assign.component';

describe('FacultyAssignComponent', () => {
  let component: FacultyAssignComponent;
  let fixture: ComponentFixture<FacultyAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
