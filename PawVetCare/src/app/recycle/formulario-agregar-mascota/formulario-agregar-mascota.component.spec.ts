import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAgregarMascotaComponent } from './formulario-agregar-mascota.component';

describe('FormularioAgregarMascotaComponent', () => {
  let component: FormularioAgregarMascotaComponent;
  let fixture: ComponentFixture<FormularioAgregarMascotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioAgregarMascotaComponent]
    });
    fixture = TestBed.createComponent(FormularioAgregarMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
