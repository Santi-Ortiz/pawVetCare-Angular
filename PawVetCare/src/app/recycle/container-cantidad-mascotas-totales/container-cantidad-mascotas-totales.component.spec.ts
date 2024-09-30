import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCantidadMascotasTotalesComponent } from './container-cantidad-mascotas-totales.component';

describe('ContainerCantidadMascotasTotalesComponent', () => {
  let component: ContainerCantidadMascotasTotalesComponent;
  let fixture: ComponentFixture<ContainerCantidadMascotasTotalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerCantidadMascotasTotalesComponent]
    });
    fixture = TestBed.createComponent(ContainerCantidadMascotasTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
