import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoledashboardComponent } from './roledashboard.component';

describe('RoledashboardComponent', () => {
  let component: RoledashboardComponent;
  let fixture: ComponentFixture<RoledashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoledashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoledashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
