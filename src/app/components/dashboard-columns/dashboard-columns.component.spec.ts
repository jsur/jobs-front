import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardColumnsComponent } from './dashboard-columns.component';

describe('DashboardColumnsComponent', () => {
  let component: DashboardColumnsComponent;
  let fixture: ComponentFixture<DashboardColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
