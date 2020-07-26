import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaagComponent } from './raag.component';

describe('RaagComponent', () => {
  let component: RaagComponent;
  let fixture: ComponentFixture<RaagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
