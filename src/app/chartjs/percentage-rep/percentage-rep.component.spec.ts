import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageRepComponent } from './percentage-rep.component';

describe('PercentageRepComponent', () => {
  let component: PercentageRepComponent;
  let fixture: ComponentFixture<PercentageRepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentageRepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
