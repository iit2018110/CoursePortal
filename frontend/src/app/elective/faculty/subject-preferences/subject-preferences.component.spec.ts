import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectPreferencesComponent } from './subject-preferences.component';

describe('SubjectPreferencesComponent', () => {
  let component: SubjectPreferencesComponent;
  let fixture: ComponentFixture<SubjectPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectPreferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
