import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSesionClienteComponent } from './container-sesion-cliente.component';

describe('ContainerSesionClienteComponent', () => {
  let component: ContainerSesionClienteComponent;
  let fixture: ComponentFixture<ContainerSesionClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerSesionClienteComponent]
    });
    fixture = TestBed.createComponent(ContainerSesionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
