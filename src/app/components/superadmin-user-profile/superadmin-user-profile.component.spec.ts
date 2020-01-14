import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminUserProfileComponent } from './superadmin-user-profile.component';

describe('SuperadminUserProfileComponent', () => {
  let component: SuperadminUserProfileComponent;
  let fixture: ComponentFixture<SuperadminUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperadminUserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
