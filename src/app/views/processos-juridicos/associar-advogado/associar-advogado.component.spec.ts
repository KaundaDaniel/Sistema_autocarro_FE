import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociarAdvogadoComponent } from './associar-advogado.component';

describe('AssociarAdvogadoComponent', () => {
  let component: AssociarAdvogadoComponent;
  let fixture: ComponentFixture<AssociarAdvogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociarAdvogadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociarAdvogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
