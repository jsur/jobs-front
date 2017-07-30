import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNewleadComponent } from './dashboard-newlead.component';

describe('DashboardNewleadComponent', () => {
  let component: DashboardNewleadComponent;
  let fixture: ComponentFixture<DashboardNewleadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardNewleadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNewleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
