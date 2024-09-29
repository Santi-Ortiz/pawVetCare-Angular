import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAgregarVeterinarioComponent } from './formulario-agregar-veterinario.component';

describe('FormularioAgregarVeterinarioComponent', () => {
  let component: FormularioAgregarVeterinarioComponent;
  let fixture: ComponentFixture<FormularioAgregarVeterinarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioAgregarVeterinarioComponent]
    });
    fixture = TestBed.createComponent(FormularioAgregarVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
