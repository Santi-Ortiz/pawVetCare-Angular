import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSesionFormClienteComponent } from './container-sesion-form-cliente.component';

describe('ContainerSesionFormClienteComponent', () => {
  let component: ContainerSesionFormClienteComponent;
  let fixture: ComponentFixture<ContainerSesionFormClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerSesionFormClienteComponent]
    });
    fixture = TestBed.createComponent(ContainerSesionFormClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
