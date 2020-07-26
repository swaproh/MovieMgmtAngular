import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaagDashboardComponent } from './raag-dashboard.component';

describe('RaagDashboardComponent', () => {
  let component: RaagDashboardComponent;
  let fixture: ComponentFixture<RaagDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaagDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaagDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
