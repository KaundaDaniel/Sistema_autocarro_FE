import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocarroDetalhesComponent } from './autocarro-detalhes.component';

describe('AutocarroDetalhesComponent', () => {
  let component: AutocarroDetalhesComponent;
  let fixture: ComponentFixture<AutocarroDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocarroDetalhesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocarroDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
