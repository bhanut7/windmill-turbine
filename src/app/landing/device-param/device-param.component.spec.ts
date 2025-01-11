import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceParamComponent } from './device-param.component';

describe('DeviceParamComponent', () => {
  let component: DeviceParamComponent;
  let fixture: ComponentFixture<DeviceParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceParamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
