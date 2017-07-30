import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLeadcardComponent } from './dashboard-leadcard.component';

describe('DashboardLeadcardComponent', () => {
  let component: DashboardLeadcardComponent;
  let fixture: ComponentFixture<DashboardLeadcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLeadcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLeadcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
