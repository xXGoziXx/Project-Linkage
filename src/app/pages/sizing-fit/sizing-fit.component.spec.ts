import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizingFitComponent } from './sizing-fit.component';

describe('SizingFitComponent', () => {
  let component: SizingFitComponent;
  let fixture: ComponentFixture<SizingFitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizingFitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SizingFitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
