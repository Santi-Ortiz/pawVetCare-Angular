import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerGananciasTotalesComponent } from './container-ganancias-totales.component';

describe('ContainerGananciasTotalesComponent', () => {
  let component: ContainerGananciasTotalesComponent;
  let fixture: ComponentFixture<ContainerGananciasTotalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerGananciasTotalesComponent]
    });
    fixture = TestBed.createComponent(ContainerGananciasTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
