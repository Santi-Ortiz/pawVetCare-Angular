import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselHistorialComponent } from './carrusel-historial.component';

describe('CarruselHistorialComponent', () => {
  let component: CarruselHistorialComponent;
  let fixture: ComponentFixture<CarruselHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarruselHistorialComponent]
    });
    fixture = TestBed.createComponent(CarruselHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
