import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSimulatorComponent } from './cart-simulator.component';

describe('CartSimulatorComponent', () => {
  let component: CartSimulatorComponent;
  let fixture: ComponentFixture<CartSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartSimulatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
