import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NmeaAisComponent } from './nmea-ais.component';

describe('NmeaAisComponent', () => {
  let component: NmeaAisComponent;
  let fixture: ComponentFixture<NmeaAisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NmeaAisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NmeaAisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
