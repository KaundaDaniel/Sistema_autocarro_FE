import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilheteComponent } from './bilhete.component';

describe('BilheteComponent', () => {
  let component: BilheteComponent;
  let fixture: ComponentFixture<BilheteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilheteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BilheteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
