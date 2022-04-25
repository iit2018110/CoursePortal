import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalSettingComponent } from './portal-setting.component';

describe('PortalSettingComponent', () => {
  let component: PortalSettingComponent;
  let fixture: ComponentFixture<PortalSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
