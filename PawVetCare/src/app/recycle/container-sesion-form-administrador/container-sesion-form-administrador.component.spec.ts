import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSesionFormAdministradorComponent } from './container-sesion-form-administrador.component';

describe('ContainerSesionFormAdministradorComponent', () => {
  let component: ContainerSesionFormAdministradorComponent;
  let fixture: ComponentFixture<ContainerSesionFormAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerSesionFormAdministradorComponent]
    });
    fixture = TestBed.createComponent(ContainerSesionFormAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
