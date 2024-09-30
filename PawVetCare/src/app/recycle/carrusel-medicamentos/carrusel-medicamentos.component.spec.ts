import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselMedicamentosComponent } from './carrusel-medicamentos.component';

describe('CarruselMedicamentosComponent', () => {
  let component: CarruselMedicamentosComponent;
  let fixture: ComponentFixture<CarruselMedicamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarruselMedicamentosComponent]
    });
    fixture = TestBed.createComponent(CarruselMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
