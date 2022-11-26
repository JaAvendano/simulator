import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadSimuationComponent } from './load-simuation.component';

describe('LoadSimuationComponent', () => {
  let component: LoadSimuationComponent;
  let fixture: ComponentFixture<LoadSimuationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadSimuationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadSimuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
