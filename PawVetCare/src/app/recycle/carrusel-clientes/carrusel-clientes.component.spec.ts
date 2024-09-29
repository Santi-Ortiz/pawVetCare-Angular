import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselClientesComponent } from './carrusel-clientes.component';

describe('CarruselClientesComponent', () => {
  let component: CarruselClientesComponent;
  let fixture: ComponentFixture<CarruselClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarruselClientesComponent]
    });
    fixture = TestBed.createComponent(CarruselClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
