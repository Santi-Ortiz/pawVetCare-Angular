import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCantidadVeterinariosInactivosComponent } from './container-cantidad-veterinarios-inactivos.component';

describe('ContainerCantidadVeterinariosInactivosComponent', () => {
  let component: ContainerCantidadVeterinariosInactivosComponent;
  let fixture: ComponentFixture<ContainerCantidadVeterinariosInactivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerCantidadVeterinariosInactivosComponent]
    });
    fixture = TestBed.createComponent(ContainerCantidadVeterinariosInactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
