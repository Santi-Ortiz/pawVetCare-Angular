import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoItemComponent } from './medicamento-item.component';

describe('MedicamentoItemComponent', () => {
  let component: MedicamentoItemComponent;
  let fixture: ComponentFixture<MedicamentoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicamentoItemComponent]
    });
    fixture = TestBed.createComponent(MedicamentoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
