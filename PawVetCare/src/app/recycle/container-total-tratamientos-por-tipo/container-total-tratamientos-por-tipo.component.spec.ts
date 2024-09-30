import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerTotalTratamientosPorTipoComponent } from './container-total-tratamientos-por-tipo.component';

describe('ContainerTotalTratamientosPorTipoComponent', () => {
  let component: ContainerTotalTratamientosPorTipoComponent;
  let fixture: ComponentFixture<ContainerTotalTratamientosPorTipoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerTotalTratamientosPorTipoComponent]
    });
    fixture = TestBed.createComponent(ContainerTotalTratamientosPorTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
