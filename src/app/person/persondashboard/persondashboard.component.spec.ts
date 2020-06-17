import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersondashboardComponent } from './persondashboard.component';

describe('PersondashboardComponent', () => {
  let component: PersondashboardComponent;
  let fixture: ComponentFixture<PersondashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersondashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersondashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
