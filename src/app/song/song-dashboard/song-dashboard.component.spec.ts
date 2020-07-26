import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDashboardComponent } from './song-dashboard.component';

describe('SongDashboardComponent', () => {
  let component: SongDashboardComponent;
  let fixture: ComponentFixture<SongDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
