import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerVentasTotalesComponent } from './container-ventas-totales.component';

describe('ContainerVentasTotalesComponent', () => {
  let component: ContainerVentasTotalesComponent;
  let fixture: ComponentFixture<ContainerVentasTotalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerVentasTotalesComponent]
    });
    fixture = TestBed.createComponent(ContainerVentasTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
