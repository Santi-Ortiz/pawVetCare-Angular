import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCantidadVeterinariosActivosComponent } from './container-cantidad-veterinarios-activos.component';

describe('ContainerCantidadVeterinariosActivosComponent', () => {
  let component: ContainerCantidadVeterinariosActivosComponent;
  let fixture: ComponentFixture<ContainerCantidadVeterinariosActivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerCantidadVeterinariosActivosComponent]
    });
    fixture = TestBed.createComponent(ContainerCantidadVeterinariosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
