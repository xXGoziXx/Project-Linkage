import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAndReturnsComponent } from './shipping-and-returns.component';

describe('ShippingAndReturnsComponent', () => {
  let component: ShippingAndReturnsComponent;
  let fixture: ComponentFixture<ShippingAndReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingAndReturnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAndReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
