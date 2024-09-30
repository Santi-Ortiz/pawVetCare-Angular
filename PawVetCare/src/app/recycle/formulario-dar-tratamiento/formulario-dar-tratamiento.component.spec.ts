import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDarTratamientoComponent } from './formulario-dar-tratamiento.component';

describe('FormularioDarTratamientoComponent', () => {
  let component: FormularioDarTratamientoComponent;
  let fixture: ComponentFixture<FormularioDarTratamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioDarTratamientoComponent]
    });
    fixture = TestBed.createComponent(FormularioDarTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
