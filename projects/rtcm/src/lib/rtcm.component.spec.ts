import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtcmComponent } from './rtcm.component';

describe('RtcmComponent', () => {
  let component: RtcmComponent;
  let fixture: ComponentFixture<RtcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
