import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfftrackSimulatorComponent } from './offtrack-simulator.component';

describe('OfftrackSimulatorComponent', () => {
  let component: OfftrackSimulatorComponent;
  let fixture: ComponentFixture<OfftrackSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfftrackSimulatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfftrackSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
