import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NmeaUbxComponent } from './nmea-ubx.component';

describe('NmeaUbxComponent', () => {
  let component: NmeaUbxComponent;
  let fixture: ComponentFixture<NmeaUbxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NmeaUbxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NmeaUbxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
